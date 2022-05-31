const data = [
  {
    "name": "apples",
    "values": [
      { "x": 0, "y": 3840 },
      { "x": 1, "y": 1600 },
      { "x": 2, "y": 640 },
      { "x": 3, "y": 320 },
    ]
  },
  {
    "name": "bananas",
    "values": [
      { "x": 0, "y": 1920 },
      { "x": 1, "y": 1440 },
      { "x": 2, "y": 960 },
      { "x": 3, "y": 480 },
    ],
  },
  {
    "name": "cherries",
    "values": [
      { "x": 0, "y": 960 },
      { "x": 1, "y": 960 },
      { "x": 2, "y": 640 },
      { "x": 3, "y": 640 },
    ],
  },
  {
    "name": "dates",
    "values": [
      { "x": 0, "y": 400 },
      { "x": 1, "y": 400 },
      { "x": 2, "y": 400 },
      { "x": 3, "y": 400 },
    ],
  },
];

// job is to compute the offset (y0) and inject y0 into it
// mutates y prop as well via .out()
const stack = d3.layout.stack()
  .values(d => d.values)
  .y(d => d.y);

const stackedData = stack(data);
console.log(stackedData);