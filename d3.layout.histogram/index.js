// Edge case where number of bins and contents of bins are different between
// v3 and v6
const data = d3.range(-10, 100);
const hist = d3.layout.histogram();
hist.range([-20, 50]);
hist.bins([1, 10, 30]); // data below and over threshold but inside range edge case
console.log(hist(data));

// results with incl start, excl end
[
    [-10, 10],
    [11, 100],
]