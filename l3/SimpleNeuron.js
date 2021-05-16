const getScalarProduct = (vector1, vector2) => {
  return vector1.reduce((acc, x, i) => acc + x * vector2[i], 0);
}

const sgn = (z) => z > 0 ? 1 : -1;

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

console.log('___n1___');

const n1 = new Neuron(2);

n1.learn([
  {input: [1, 1], output: 1},
  {input: [1, -1], output: -1},
  {input: [-1, 1], output: -1},
  {input: [-1, -1], output: -1},
]);

console.log(n1.weights);

console.log(n1.evaluate([1, 1]));
console.log(n1.evaluate([1, -1]));
console.log(n1.evaluate([-1, 1]));
console.log(n1.evaluate([-1, -1]));

console.log('___n2___');

const n2 = new Neuron(3);

n2.learn([
  {input: [1, 1, 1], output: 1},
  {input: [1, 1, -1], output: 1},
  {input: [1, -1, 1], output: 1},
  {input: [1, -1, -1], output: -1},
  {input: [-1, 1, 1], output: 1},
  {input: [-1, 1, -1], output: 1},
  {input: [-1, -1, 1], output: -1},
  {input: [-1, -1, -1], output: -1},
]);

console.log(n2.weights);

console.log(n2.evaluate([1, 1, 1]));
console.log(n2.evaluate([1, 1, -1]));
console.log(n2.evaluate([1, -1, 1]));
console.log(n2.evaluate([1, -1, -1]));
console.log(n2.evaluate([-1, 1, 1]));
console.log(n2.evaluate([-1, 1, -1]));
console.log(n2.evaluate([-1, -1, 1]));
console.log(n2.evaluate([-1, -1, -1]));

console.log('___n3___');


const n3 = new Neuron(3);

n3.learn([
  {input: [1, 1, 1], output: 1},
  {input: [1, 1, -1], output: -1},
  {input: [1, -1, 1], output: -1},
  {input: [1, -1, -1], output: -1},
  {input: [-1, 1, 1], output: 1},
  {input: [-1, 1, -1], output: -1},
  {input: [-1, -1, 1], output: 1},
  {input: [-1, -1, -1], output: -1},
]);

console.log(n3.weights);

console.log(n3.evaluate([1, 1, 1]));
console.log(n3.evaluate([1, 1, -1]));
console.log(n3.evaluate([1, -1, 1]));
console.log(n3.evaluate([1, -1, -1]));
console.log(n3.evaluate([-1, 1, 1]));
console.log(n3.evaluate([-1, 1, -1]));
console.log(n3.evaluate([-1, -1, 1]));
console.log(n3.evaluate([-1, -1, -1]));


console.log('___n4___');


const n4 = new Neuron(3);

n4.learn([
  {input: [0.5, 1, 0.5], output: 1},
  {input: [0.5, 1, -0.3], output: 1},
  {input: [0.4, -0.5, 0.4], output: 1},
  {input: [0.4, -0.5, -0.5], output: -1},
  {input: [-0.3, 0.7, 0.5], output: 1},
  {input: [-0.3, 0.7, -0.4], output: 1},
  {input: [-0.7, -1, 0.3], output: -1},
  {input: [-0.7, -1, -0.5], output: -1},
]);

console.log(n4.weights);

console.log(n4.evaluate([0.5, 1, 0.5]));
console.log(n4.evaluate([0.5, 1, -0.3]));
console.log(n4.evaluate([0.4, -0.5, 0.4]));
console.log(n4.evaluate([0.4, -0.5, -0.5]));
console.log(n4.evaluate([-0.3, 0.7, 0.5]));
console.log(n4.evaluate([-0.3, 0.7, -0.4]));
console.log(n4.evaluate([-0.7, -1, 0.3]));
console.log(n4.evaluate([-0.7, -1, -0.5]));

console.log('___n5___');


const n5 = new Neuron(3);

n5.learn([
  {input: [0.5, 1, 0.5], output: 1},
  {input: [0.5, 1, -0.3], output: -1},
  {input: [0.4, -0.5, 0.4], output: -1},
  {input: [0.4, -0.5, -0.5], output: -1},
  {input: [-0.3, 0.7, 0.5], output: 1},
  {input: [-0.3, 0.7, -0.4], output: -1},
  {input: [-0.7, -1, 0.3], output: 1},
  {input: [-0.7, -1, -0.5], output: -1},
]);

console.log(n5.weights);

console.log(n5.evaluate([0.5, 1, 0.5]));
console.log(n5.evaluate([0.5, 1, -0.3]));
console.log(n5.evaluate([0.4, -0.5, 0.4]));
console.log(n5.evaluate([0.4, -0.5, -0.5]));
console.log(n5.evaluate([-0.3, 0.7, 0.5]));
console.log(n5.evaluate([-0.3, 0.7, -0.4]));
console.log(n5.evaluate([-0.7, -1, 0.3]));
console.log(n5.evaluate([-0.7, -1, -0.5]));
