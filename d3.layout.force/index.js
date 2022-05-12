var w = 960, h = 500,
    x_mean = w / 2,
    x_std = w / 10,
    y_mean = h / 2,
    y_std = h / 10,
    labelBox, links,
    data = [];


var svg = d3.select("body")
    .append("svg:svg")
    .attr("height", h)
    .attr("width", w)

function refresh() {
    // plot the data as usual
    anchors = svg.selectAll(".anchor").data(data, function (d, i) { return i })
    anchors.exit().attr("class", "exit").transition().duration(300).style("opacity", 0).remove()
    anchors.enter().append("circle").attr("class", "anchor").attr("r", 4).attr("cx", function (d) { return d.x }).attr("cy", function (d) { return h - d.y })
    anchors.transition()
        .delay(function (d, i) { return i * 10 })
        .duration(250)
        .attr("cx", function (d) { return d.x })
        .attr("cy", function (d) { return h - d.y })


    // Now for the labels
    anchors.call(labelForce.update)  //  This is the only function call needed, the rest is just drawing the labels

    labels = svg.selectAll(".labels").data(data, function (d, i) { return i })
    labels.exit().attr("class", "exit").transition().delay(0).duration(250).style("opacity", 0).remove()

    // Draw the labelbox, caption and the link
    newLabels = labels.enter().append("g").attr("class", "labels")

    newLabelBox = newLabels.append("g").attr("class", "labelbox")
    newLabelBox.append("circle").attr("r", 11)
    newLabelBox.append("text").attr("class", "labeltext").attr("y", 6)
    newLabels.append("line").attr("class", "link")

    labelBox = svg.selectAll(".labels").selectAll(".labelbox")
    links = svg.selectAll(".link")
    labelBox.selectAll("text").text(function (d) { return d.num })

}

function redrawLabels() {
    labelBox
        .attr("transform", function (d) { return "translate(" + d.labelPos.x + " " + d.labelPos.y + ")" })

    links
        .attr("x1", function (d) { return d.anchorPos.x })
        .attr("y1", function (d) { return d.anchorPos.y })
        .attr("x2", function (d) { return d.labelPos.x })
        .attr("y2", function (d) { return d.labelPos.y })
}


// Initialize the label-forces
labelForce = d3.force_labels()
    .linkDistance(0)
    .gravity(0)
    .nodes([])
    .links([])
    .charge(-60)
    .on("tick", redrawLabels)



// and now for the data functionality
function randomize(count) {
    z1 = d3.random.normal()
    z2 = d3.random.normal()
    data = data.concat(d3.range(count || 100).map(function (d, i) { return { z1: z1(), z2: z2(), num: data.length + i } }))
    correlate()
}

function correlate() {
    var corr = Number(d3.select("#corr").property("value"))
    console.log(`corr changed: ${corr}`);
    d3.select("#corr-label").text("Correlation: " + d3.format(".0%")(corr))

    data.forEach(function (d) {
        d.x = x_mean + (d.z1 * x_std),
            d.y = y_mean + y_std * (corr * d.z1 + d.z2 * Math.sqrt(1 - Math.pow(corr, 2)))
    })
    refresh()
}

// and finally hook up the controls

d3.select("#randomize20").on("click", function () { data = []; randomize(20) })
d3.select("#randomize50").on("click", function () { data = []; randomize(50) })
d3.select("#randomize100").on("click", function () { data = []; randomize(100) })
d3.select("#addone").on("click", function () { randomize(1) })
d3.select("#corr")
    .on("change", function () { d3.select("#corr-label").text("Correlation: " + d3.format(".0%")(this.value)) })
    .on("mouseup", correlate)
d3.select("#charge")
    .on("change", function () {
        d3.select("#charge-label").text("Label charge: " + d3.format("f")(this.value))
        labelForce.charge(-this.value)
            .start();
        console.log(labelForce.alpha());
    })

randomize();