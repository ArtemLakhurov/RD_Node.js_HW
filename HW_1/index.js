const commandLineArg = process.argv.slice(2);
const parsedArg = JSON.parse(commandLineArg);

if (!Array.isArray(parsedArg)) throw new Error('Input must be an array');

const flatReduceSum = (array) => {
  return parsedArg.flat(Infinity).reduce((acc, curr) => acc + curr, 0);
};

console.log(flatReduceSum(parsedArg), 'sum array values');

let sum = 0;

const recursiveSum = (array) => {
  array.forEach((value) => {
    if (Number.isInteger(value)) {
      sum += value;
    } else if (Array.isArray(value)) {
      recursiveSum(value);
    }
  });
  return sum;
};

console.log(recursiveSum(parsedArg), 'recursive sum');
