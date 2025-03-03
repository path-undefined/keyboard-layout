const fs = require("node:fs");

const params = process.argv.slice(2);
const data = [];

while (params.length > 0) {
  const filePath = params.shift();
  const weight = Number.parseInt(params.shift());

  data.push({
    frequencies: JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" })),
    weight,
  });
}

const keys = [
  "a", "b", "c", "d", "e", "f", "g",
  "h", "i", "j", "k", "l", "m", "n",
  "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z",
  " ",
];

const characterFrequency = {};

for (const key of keys) {
  let sumOfFrequency = 0;
  let sumOfWeight = 0;

  for (const record of data) {
    sumOfFrequency += (record.frequencies.characterFrequency[key] || 0) * record.weight;
    sumOfWeight += record.weight || 0;
  }

  if (sumOfFrequency === 0) {
    continue;
  }

  characterFrequency[key] = sumOfFrequency / sumOfWeight;
}

const combinationFrequency = {};

for (const key1 of keys) {
  for (const key2 of keys) {
    const combination = key1 + key2;

    let sumOfFrequency = 0;
    let sumOfWeight = 0;

    for (const record of data) {
      sumOfFrequency += (record.frequencies.combinationFrequency[combination] || 0) * record.weight;
      sumOfWeight += record.weight || 0;
    }

    if (sumOfFrequency === 0) {
      continue;
    }
  
    combinationFrequency[combination] = sumOfFrequency / sumOfWeight;
  }
}

console.log(JSON.stringify({
  characterFrequency,
  combinationFrequency,
}, null, 2))
