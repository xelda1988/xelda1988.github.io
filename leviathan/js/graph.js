/* Doc
 * https://github.com/mbostock/d3/wiki/Force-Layout
 * http://thinkingonthinking.com/Getting-Started-With-D3/
 * http://www.coppelia.io/an-a-to-z-of-extra-features-for-the-d3-force-layout/
 * http://bl.ocks.org/mbostock/4062045
 */
var padding = 1, // separation between circles
        radius = 8;
function collide(pop, alpha) {
    var quadtree = d3.geom.quadtree(pop);
    return function(d) {
        var rb = 2 * radius + padding,
                nx1 = d.x - rb,
                nx2 = d.x + rb,
                ny1 = d.y - rb,
                ny2 = d.y + rb;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y);
                if (l < rb) {
                    l = (l - rb) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}

function Graph(width, height, population) {

    this.population = population;
    this.links = new Array();
    this.updateLinks();
    this.div = d3.select('#graph');
    this.div.select('svg').remove();
    this.svg = this.div
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    this.force = d3.layout.force()
            .gravity(.2)
            .distance(250)
            .charge(function(d, i) {
                return d.getReputation(population);
            })
            //.charge(-10)
            .size([width, height]);
    // Add the data
    this.force.nodes(population.pop)
            .links(this.links)
            .start();

    this.link = this.svg.selectAll(".link")
            .data(this.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke", function(d) {
                return valueToRGB(d.opinion);
            })

    this.node = this.svg.selectAll(".node")
            .data(this.force.nodes())
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 8)
            /*.attr("fill", function(d, i) {
             return valueToRGB(d.getReputation(population));
             })*/
            .style("fill", function(d) {
                console.log(d)
                return  valueToRGB(d.opinion[d.id]);
            })
            .call(this.force.drag)
            .on('mouseover', function(d) {
                $('#indivInfo').html("Individual id: "+d.id + " / reputation: " + d.getReputation(population) + "");
            })
            .on('mouseout', function() {
                $('#indivInfo').html("")
            });

    var node = this.node;
    var link = this.link;
    this.force.on("tick", function(e) {
        link.attr("x1", function(d) {
            return d.source.x;
        }).attr("y1", function(d) {
            return d.source.y;
        }).attr("x2", function(d) {
            return d.target.x;
        }).attr("y2", function(d) {
            return d.target.y;
        });
        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        node.each(collide(population.pop, 0.5));
    });
    this.updateGraph();

}

Graph.prototype.findLink = function(from, to) {
    for (var i = 0; i < this.links.length; i++) {
        if (this.links[i].source === this.population.pop[from] && this.links[i].target === this.population.pop[to]) {
            return this.links[i];
        }
    }
    return null;
};

Graph.prototype.updateLinks = function() {
    for (var i = 0; i < this.population.sizeP; i++) {
        // update edges
        for (var j = 0; j < this.population.sizeP; j++) {
            if (this.population.pop[i].opinion[j] > 0.0) { // conditions is a positive opinion of i for j
                if (i !== j) {
                    var link = this.findLink(i, j);
                    if (link === null) {
                        link = {"source": this.population.pop[i], "target": this.population.pop[j]};
                        this.links.push(link);
                    }
                    link.opinion = this.population.pop[i].opinion[j];
                }
            } else {
                var link = this.findLink(i, j);
                if (link !== null) {
                    this.links.splice($.inArray(link, this.links), 1);
                }
            }
        }
    }
}

Graph.prototype.updateGraph = function() {
    this.link = this.link.data(this.links);
    this.link.exit().remove();
    this.link.enter().insert("line", ".node").attr("class", "link");
    this.node = this.node.data(this.population.pop, function(d) { return d.id;});
    this.node.selectAll('.node').style("fill", function(d) {
        console.log(d.getReputation(population));
        return valueToRGB(d.getReputation(population));
    });
    
    this.node.enter().append("svg:g")
            .attr("class", "node")
            .append("svg:circle")/*.insert("circle", ".cursor")*/.attr("class", "node").attr("r", 5).style("fill", function(d) {
        console.log(d.getReputation(population));
        return valueToRGB(d.getReputation(population));
    }).call(this.force.drag);
    /*this.node = this.svg.selectAll("circle.node")
     .data(population.pop)
     .enter().append("svg:g")
     .attr("class", "node")
     .append("svg:circle")*/

    this.force.start();
};
