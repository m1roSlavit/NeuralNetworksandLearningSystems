const getScalarProduct = (vector1, vector2) => {
  return vector1.reduce((acc, x, i) => acc + x * vector2[i], 0);
}

const sgn = (z) => z > 0 ? 1 : -1;

function* boolFuncGenerator(n, varMode = false) {
  const c = varMode ? 2**n : 2**(2**n);
  for(let i = 0; i < c; i++) {
    yield i.toString(2)
      .padStart(varMode ? n : 2**n, 0)
      .split('')
      .map(Number)
      .map(x => x === 0 ? 1 : -1);
  }
}

const drawBoolTable = (n, variables) => {
  const table = [];

  for(const val of boolFuncGenerator(n, true)) {
    let obj = {};
    for (let i = 0; i < variables.length; i++) {
      obj[variables[i]] = val[i];
    }
    table.push(obj);
  }

  const funcResGen = boolFuncGenerator(n);

  for(let i = 0; i < 2**(2**n); i++) {
    const vals = funcResGen.next().value;

    const randKey = `f${i + 1}`;

    for (let j = 0; j < 2**n; j++) {
      table[j][randKey] = vals[j];
    }
  }


  console.table(table);
}

class Neuron {
  constructor(dentriesLength) {
    this.dentriesLength = dentriesLength;
    this.weights = new Array(dentriesLength + 1);
  }

  learn(data) {
    const N = data.length;

    let resultsVector = [];

    for (let j = 0; j < N; j++) {
      resultsVector[j] = data[j].output;
    }

    // w0
    this.weights[0] = resultsVector.reduce((acc, x) => acc + x, 0) / N;

    //w1, w2, ..., wN
    for (let i = 0; i < this.dentriesLength; i++) {
      let scalarProduct = 0;
      for (let j = 0; j < N; j++) {
        const currentVal = data[j].input[i];
        const expectedResult = resultsVector[j];
        scalarProduct += (1/currentVal) * (1/expectedResult);
      }
      this.weights[i + 1] = scalarProduct / N;
    }
  }

  evaluate(data) {
    const weightedSum = getScalarProduct([1, ...data], this.weights);
    return sgn(weightedSum);
  }
}

// console result

console.log('expected');
drawBoolTable(2, ['x', 'y']);
console.log('\n');


const resTable = [
  {x: 1, y: 1},
  {x: 1, y: -1},
  {x: -1, y: 1},
  {x: -1, y: -1},
];

const gen = boolFuncGenerator(2);
const variableValues = [...boolFuncGenerator(2, true)];

for (let i = 0; i < 16; i++) {
  const val = gen.next().value;
  const n1 = new Neuron(2);

  n1.learn([
    {input: [1, 1], output: val[0]},
    {input: [1, -1], output: val[1]},
    {input: [-1, 1], output: val[2]},
    {input: [-1, -1], output: val[3]},
  ]);
  const fNameKey = `f${i + 1}`;
  for(let i = 0; i < 4; i++) {
    resTable[i][fNameKey] = n1.evaluate(variableValues[i]);
  }
}

console.log('evaluated');
console.table(resTable);