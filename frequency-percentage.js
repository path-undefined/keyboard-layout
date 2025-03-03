const fs = require("node:fs");

const fileContent = fs.readFileSync(process.argv[2], { encoding: "utf8" });
const frequency = JSON.parse(fileContent);

const sumOfCharacterFrequencies = Object.values(frequency.characterFrequency).reduce((a, b) => a + b, 0)
for (const [key, value] of Object.entries(frequency.characterFrequency)) {
  frequency.characterFrequency[key] = Math.round((value / sumOfCharacterFrequencies) * 1000000)
}

const sumOfCombinationFrequencies = Object.values(frequency.combinationFrequency).reduce((a, b) => a + b, 0)
for (const [key, value] of Object.entries(frequency.combinationFrequency)) {
  frequency.combinationFrequency[key] = Math.round((value / sumOfCombinationFrequencies) * 1000000)
}

console.log(JSON.stringify(frequency, null, 2))
