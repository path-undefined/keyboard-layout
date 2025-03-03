const fs = require("node:fs");

const fileContent = fs.readFileSync(process.argv[2], { encoding: "utf8" });
const lines = fileContent.split("\n");

const characterFrequency = {};
const combinationFrequency = {};

for (const line of lines) {
  const parts = line.split(" ")

  const word = parts[1]
    .toLocaleLowerCase()
    .replaceAll(/[^a-zäöüß]/g, "");

  if (!word) {
    continue;
  }

  const frequency = Math.round(Number(parts[2]));

  let lastChar = "";

  for (let i = 0; i <= word.length; i++) {
    let currentChar = word.charAt(i)
      .replace("ä", "a")
      .replace("ö", "o")
      .replace("ü", "u")
      .replace("ß", "s");

    if (currentChar) {
      if (characterFrequency[currentChar] === undefined) {
        characterFrequency[currentChar] = 0;
      }
  
      characterFrequency[currentChar] += frequency
    }

    const combination = (lastChar || " ") + (currentChar || " ");

    if (combinationFrequency[combination] === undefined) {
      combinationFrequency[combination] = 0;
    }

    combinationFrequency[combination] += frequency;

    lastChar = currentChar;
  }
}

console.log(JSON.stringify({
  characterFrequency,
  combinationFrequency,
}, null, 2));
