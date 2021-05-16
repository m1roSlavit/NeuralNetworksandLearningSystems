const hebbFunction = (data) => {
  const N = data.length;
  const dentriesLength = data[0].input.length;
  const weights = [];


  let resultsVector = [];

  for (let j = 0; j < N; j++) {
    resultsVector[j] = data[j].output;
  }

  // w0
  weights[0] = resultsVector.reduce((acc, x) => acc + x, 0) / N;

  //w1, w2, ..., wN
  for (let i = 0; i < dentriesLength; i++) {
    let scalarProduct = 0;
    for (let j = 0; j < N; j++) {
      const currentVal = data[j].input[i];
      const expectedResult = resultsVector[j];
      scalarProduct += (1/currentVal) * (1/expectedResult);
    }
    weights[i + 1] = scalarProduct / N;
  }

  return weights;
}

console.log(hebbFunction([
  {input: [1, 1], output: 1},
  {input: [1, -1], output: -1},
  {input: [-1, 1], output: -1},
  {input: [-1, -1], output: -1},
]));

console.log(hebbFunction([
  {input: [1, 1, 1], output: 1},
  {input: [1, 1, -1], output: 1},
  {input: [1, -1, 1], output: 1},
  {input: [1, -1, -1], output: -1},
  {input: [-1, 1, 1], output: 1},
  {input: [-1, 1, -1], output: 1},
  {input: [-1, -1, 1], output: -1},
  {input: [-1, -1, -1], output: -1},
]));