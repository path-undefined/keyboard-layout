const fs = require("node:fs");

const fileContent = fs.readFileSync(process.argv[2], { encoding: "utf8" });
const lines = fileContent.split("\n");

const result = {};

for (const line of lines) {
  const parts = line.split(" ");
  const frequency = Number.parseInt(parts[0]);
  const word = parts[1].substring(2, parts[1].length - 2).toLocaleLowerCase();

  if (result[word]) {
    result[word] += frequency;
  } else {
    result[word] = frequency;
  }
}

const entries = Object.entries(result).sort((a, b) => b[1] - a[1]);

for (let i = 0; i < entries.length; i++) {
  console.log(`${i + 1} ${entries[i][0]} ${entries[i][1]}`);
}
