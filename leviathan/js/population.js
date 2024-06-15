function arrayFilled(size, value) {
    return Array.apply(null, new Array(size)).map(Number.prototype.valueOf, value);
}

class Individual {
    /**
     * @param {int} sizePop number total of individuals
     * @param {int} id unique identifiant of the individual
     * @param {int} groupID unique identifiant of the group
     * @param {float} min_opinion constant giving the minimum value for the opinion
     */
    constructor(sizePop, id, groupID, min_opinion) {
        this.opinion = arrayFilled(sizePop, min_opinion);
        this.id = id;
        this.groupID = groupID;
        this.acquaintances = new Array(sizePop).fill(false);
        this.acquaintancesIndexes = new Array();
    }

    knows(indiv) {
        if (indiv === this.id) {
            return true;
        } else {
            return this.acquaintances[indiv];
        }
    }

    setKnows(indiv) {
        this.acquaintances[indiv] = true;
        this.acquaintancesIndexes.push(indiv);
    }

    getReputation(population) {
        let reput = 0.0;
        let nbKnownBy = 0;
        for (let i = 0; i < population.sizeP; i++) {
            if (population.pop[i].knows(this.id)) {
                if (i !== this.id) {
                    reput = reput + population.pop[i].opinion[this.id];
                    nbKnownBy++;
                }
            }
        }
        if (nbKnownBy !== 0) {
            reput = reput / nbKnownBy;
        }
        return reput;
    }

    getOpinionsAboutGroups(population) {
        const groupOpinions = arrayFilled(this.nbGroups, 0);
        const nbPerGroup = arrayFilled(this.nbGroups, 0);
        for (let i = 0; i < this.opinion.length; i++) {
            groupOpinions[population.pop[i].groupID] += this.opinion[i];
            nbPerGroup[population.pop[i].groupID]++;
        }
        for (let i = 0; i < groupOpinions.length; i++) {
            groupOpinions[i] = groupOpinions[i]/nbPerGroup[i];
        }
        return groupOpinions;
    };
    
}

class Population {
    /**
     * @param Array sizesPop number total of individuals for each group
     * @param Array omegas
     * @param Array sigmas
     * @param Array probasIntergroupContact put -1 for disabling for a group
     * @param Array kas
     * @param float delta
     * @param float min_opinion
     * @param rng andom number generator or RNG seed status. Set to null for random status.
     */
    constructor(sizesPop, omegas, sigmas, probasIntergroupContact, kas, rhos, deltas, min_opinion, rng) {
        if (typeof(rng) === 'function') {
            this.rng = rng;
        } else {
            this.rng = new Math.seedrandom(rng);
        }
        this.sizesP = sizesPop;
        this.nbGroups = sizesPop.length;
        this.sizeP = sizesPop.reduce(function (x, y) { return x + y; }, 0); // sum
        this.MIN_OPINION = min_opinion;
        // TODO mem fixé à 39 ou sizePop-1 ?
        this.mem = 39;
        this.groupsParams = sizesPop.map((e, i) => { return {
            size: e,
            omega: omegas[i],
            sigma: sigmas[i],
            ka: kas[i],
            rho: rhos[i],
            delta: deltas[i],
            probaIntergroupContact: probasIntergroupContact[i]
        } })
        this.pop = new Array();

        let id = 0
        for (let g = 0; g < this.nbGroups; g++) {
            for (let i = 0; i < sizesPop[g]; i++) {
                this.pop.push(new Individual(this.sizeP, id, g, this.MIN_OPINION, sigmas[i]));
                id++;
            }
        }
    }

    // return an int between 0 (inclusive) and max (exclusive)
    randomNextInt(max) {
        return Math.floor(this.randomNextDouble(max));
    }

    randomNextDouble(max) {
        return max * this.rng();
    }

    /**
     * 
     * @param {integer} indivID ID of the individual
     * @returns the params of the group
     */
    groupParam(indivID) {
        return this.groupsParams[this.pop[indivID].groupID];
    }

    toString() {
        let str = "";
        for (let i = 0; i < this.pop.length; i++) {
            str += this.pop[i].opinion.map((e, i) => ((" " + e.toFixed(2)).slice(-5))).join('|');
            str += "\n";
        }
        return str;
    }

    step() {
        for (let i = 0; i < this.sizeP/2; i++) {
            this.step_a_pair();
        }
    }

    step_a_pair() {
        const i = this.randomNextInt(this.sizeP);
        if (this.pop[i].opinion[i] === this.MIN_OPINION) {
            this.pop[i].opinion[i] = 0.0;
        }
        let j;
        if (this.nbGroups>1 || this.groupParam(i).probaIntergroupContact === -1) {
            // proba intergroup disabled
            j = this.randomNextInt(this.sizeP - 1);
            if (j >= i)
                j++;
        } else {
            if (this.randomNextDouble(1) <= this.groupParam(i).probaIntergroupContact) { // j have to be in another group
                j = this.randomNextInt(this.sizeP);
                while (this.pop[j].groupID === this.pop[i].groupID) {
                    j = this.randomNextInt(this.sizeP);
                }
            } else {// j is in the same group than i
                j = this.randomNextInt(this.sizeP - 1);
                if (j >= i) // to not have j==i and cover all other indices
                    j++;
                while (this.pop[j].groupID !== this.pop[i].groupID) {
                    j = this.randomNextInt(this.sizeP - 1);
                    if (j >= i) // to not have j==i and cover all other indices
                        j++;
                }
            }
        }
        if (this.pop[i].opinion[j] === this.MIN_OPINION) {
            this.pop[i].opinion[j] = 0.0;
        }
        if (!this.pop[i].acquaintances[j]) {
            this.pop[i].setKnows(j);
        }
        if (this.pop[j].opinion[j] === this.MIN_OPINION) {
            this.pop[j].opinion[j] = 0.0;
        }
        if (this.pop[j].opinion[i] === this.MIN_OPINION) {
            this.pop[j].opinion[i] = 0.0;
        }
        if (!this.pop[j].acquaintances[i]) {
            this.pop[j].setKnows(i);
        }
        this.encounter(i, j);
    }

    encounter(i, j) {
        let nbIndivTalk = 0;
        // compute the difference of opinion of each interlocutor regarding ego and the other
        // On pourrait éviter de retirer delta à chaque fois
        let boundForImpression = this.groupParam(i).delta;
        let delta = -boundForImpression + this.randomNextDouble(2 * boundForImpression);
        const dijj = this.pop[j].opinion[j] + delta - this.pop[i].opinion[j];
        delta = -boundForImpression + this.randomNextDouble(2 * boundForImpression);
        const diji = this.pop[j].opinion[i] + delta - this.pop[i].opinion[i];
        boundForImpression = this.groupParam(j).delta;
        delta = -boundForImpression + this.randomNextDouble(2 * boundForImpression);
        const djij = this.pop[i].opinion[j] + delta - this.pop[j].opinion[j];
        delta = -boundForImpression + this.randomNextDouble(2 * boundForImpression);
        const djii = this.pop[i].opinion[i] + delta - this.pop[j].opinion[i];
        // l'influence de J sur moi est lié à combien je le trouve mieux que moi ou le contraire et à combien il est sûr de lui (delta IJ est la certitude de J percu par I)
        const hij = this.computeCoefInfluence(i, j);
        const hji = this.computeCoefInfluence(j, i);
        
        // discuss (gossip) or assess themselve and the interlocutor during the encounter
        const rhoi = this.groupParam(i).rho; 
        const rhoj = this.groupParam(j).rho; 
        this.pop[i].opinion[i] = this.pop[i].opinion[i] + rhoi * hij * diji;
        this.pop[i].opinion[j] = this.pop[i].opinion[j] + rhoi * hij * dijj;
        this.pop[j].opinion[j] = this.pop[j].opinion[j] + rhoj * hji * djij;
        this.pop[j].opinion[i] = this.pop[j].opinion[i] + rhoj * hji * djii;
        this.constraintInBound(i, i);
        this.constraintInBound(i, j);
        this.constraintInBound(j, j);
        this.constraintInBound(j, i);
        // applying this code in two ways :
        [[i, j, hij, this.pop[j].acquaintancesIndexes.length], [j, i, hji, this.sizeP - 1]].forEach(([a,b, h, nbIndivTalkMin]) => {
            // select the indiv b are going to talk about to a
            nbIndivTalk = Math.min(this.groupParam(b).ka, nbIndivTalkMin);
            let g = 0;
            const talkAboutJ = new Array();
            let tire = 0;
            if (nbIndivTalk > 0) {
                while (g < nbIndivTalk) {
                    // FIXME si jamais on a tiré sizeP indivs mais éventuellement plusieurs fois les mêmes,
                    // il se peut que des indiv n'aient jamais été tiré. À ce moment là, le code dans le else
                    // va privilégier ces individus tirés plusieurs fois, non ?
                    if (this.pop[b].acquaintancesIndexes.length === (this.sizeP - 1)) {
                        tire = this.randomNextInt(this.sizeP);
                    } else {
                        tire = this.randomNextInt(this.pop[b].acquaintancesIndexes.length);
                        tire = this.pop[b].acquaintancesIndexes[tire];
                    }
                    talkAboutJ[g] = tire;
                    g++;
                }
            }
            // gossip - make them talking of those k pop - gossip
            this.gossip(a, b, talkAboutJ, h);
        });
        // apply the vanity
        this.vanity(i, j, diji);
        this.vanity(j, i, djij);
    }

    constraintInBound(indI, indK) {
        if (Math.abs(this.pop[indI].opinion[indK]) > 1.0 && this.pop[indI].knows(indK)) {
            if (this.pop[indI].opinion[indK] < 0.0) {
                this.pop[indI].opinion[indK] = -1.0;
            } else {
                this.pop[indI].opinion[indK] = 1.0;
            }
        }
    }

    computeCoefInfluence(i, j) {
        // l'influence de J sur moi dépend du niveau d'estime (combien je le trouve mieux que moi) que j'ai pour lui
        // 1. Fonction sigmoide de Leviathan JASSS 2013
        let h = 0.0;
        const sigma_i = this.groupParam(i).sigma;
        const dij = this.pop[i].opinion[j] - this.pop[i].opinion[i];
        if (sigma_i === 0.0) {
            if (dij >= 0.0) {
                h = 1.0;
            }
        } else {
            h = 1 / (1 + Math.exp(-dij / sigma_i));
        }
        return h;
    }

    gossip(indI, indJ, indK, h) {
        const rho = this.groupParam(indI).rho;
        if (rho > 0.0) {
            const boundForImpression = this.groupParam(indJ).delta;
            for (let i = 0; i < indK.length; i++) {
                if (!this.pop[indI].knows(indK[i])) {
                    if (this.mem > this.sizeP - 1) {
                        //This check is to not cancel from the memory - knownIndiv - an individual's neighbours
                        if (this.pop[indI].acquaintancesIndexes.length < this.mem) {
                            this.pop[indI].setKnows(indK[i]);
                        } else {
                            //add indK[i] and remove the last
                            // what does that mean an individual can forget its neighbour ?
                            this.updateKnownIndiv(indI, indK[i], indJ);
                        }
                    }
                }
                this.pop[indI].opinion[indK[i]] = this.pop[indI].opinion[indK[i]]
                    + rho * h * (
                        this.pop[indJ].opinion[indK[i]] - boundForImpression
                        + this.randomNextDouble(2 * boundForImpression)
                        - this.pop[indI].opinion[indK[i]]
                    );
                    this.constraintInBound(indI, indK[i]);
            }
        }
    }

    /*
    * I apply the vanity to J LA VANITE BASE SUR DIF ENTRE CE QUE J PENSE DE I
    * ET CE QUE I PENSE DE LUI MEME - RENVOIE IMAGE POSITIVE OU NEGATIVE DE SOI
    */
    vanity(indI, indJ, d) {
        if (this.groupParam(indI).omega > 0) {
            this.pop[indI].opinion[indJ] = this.pop[indI].opinion[indJ] + this.groupParam(indI).omega * d;
        }
        this.constraintInBound(indI, indJ);
    }
}