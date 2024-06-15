/* Exemples et doc
 http://bl.ocks.org/bunkat/2605010
 http://jsfiddle.net/christopheviau/v6VMf/
 http://stackoverflow.com/questions/16918493/drawing-a-square-matrix-using-d3-js
 */

function valueToRGB(value) {
    //return black for 666 (separator between opinions about agents and opinoins about group)
    if(value===666)
        return d3.rgb(0, 0, 0);
    value = (value + 1) / 2; // normalization
    if (value > 0.5) { // white to red
                color = 255*Math.min(1, (1 - value) * 2);
                return d3.rgb(255, color, color);
            } else { // blue to white
                color = 255 * value * 2;
                return d3.rgb(color, color, 255);
            }
    //return d3.interpolateRgb("#f00", "#00f")(1-value);
    //return d3.hsl(360*(value * 0.3 + 0.65), 1, 1).toString();
}

function Grid(width, height, population) {
    this.width = width;
    this.height = height;
    this.population = population;
    this.div = d3.select('#grid');
    this.div.select('svg').remove();
    this.svg = this.div.append('svg')
            .attr('width', width)
            .attr('height', height);
    this.rw = width / (population.sizeP+population.nbGroups+1);
    this.rh = width / (population.sizeP);
    this.margin = 0;
    var rw = this.rw;
    var margin = this.margin;
    // Create a group for each row in the data matrix and
    // translate the group vertically
    this.grp = this.svg.selectAll('g')
            .data(this.population.pop)
            .enter()
            .append('g')
            .attr('transform', (d, i) =>
                'translate(0, ' + (rw + margin) * i + ')'
            );
    // For each group, create a set of rectangles and bind 
    // them to the inner array (the inner array is already
    // binded to the group)
    this.grp.selectAll('rect')
            .data((d) =>
                d.opinion.concat([666]).concat(d.getOpinionsAboutGroups(this.population))
            ).enter()
            .append('rect');
    this.update();
}

Grid.prototype.update = function() {
    var rw = this.rw;
    var rh = this.rh;
    var margin = this.margin;
    this.grp.selectAll('rect')
            .data((d) =>
                d.opinion.concat([666]).concat(d.getOpinionsAboutGroups(this.population))
            ).attr('x', (d, i) => (rw + margin) * i
            ).attr('width', rw)
            .attr('height', rh)
            .style('fill', (d) => valueToRGB(d)
            );
}
