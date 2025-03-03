const comboFrequency = require("./merged-key-combo-frequency-unified.json").combinationFrequency;
const keyFrequency = require("./merged-key-combo-frequency-unified.json").characterFrequency;

const mode = process.argv[2];
const params = process.argv.slice(3);

if (mode === 'least_combined_with') {
  const key = params[0];

  console.log(`Keys are least combined with ${key}:`);

  const result = {};

  Object.entries(comboFrequency)
    .filter(([combo]) => combo.split("").some((char) => key.includes(char)))
    .forEach(([combo, frequency]) => {
      key.split("").forEach((char) => {
        const combinedKey = combo.replace(char, "");
        if (combinedKey.length > 1) {
          return;
        }
        if (!result[combinedKey]) {
          result[combinedKey] = 0;
        }
        result[combinedKey] += frequency;
      });
    });

  Object.entries(result)
    .sort(([c1, f1], [c2, f2]) => f1 - f2)
    .forEach(([combo, frequency]) => {
      console.log(`${combo} ${frequency}`);
    });
}

if (mode === 'connection_between') {
  const cluster1 = params[0];
  const culster2 = params[1];

  let sum = 0;
  
  for (let i = 0; i < cluster1.length; i++) {
    for (let j = 0; j < culster2.length; j++) {
      const combo1 = cluster1[i] + culster2[j];
      const combo2 = culster2[j] + cluster1[i];

      sum += (comboFrequency[combo1] || 0) + (comboFrequency[combo2] || 0);
    }
  }

  console.log(sum);
}

if (mode === 'sum_of_frequencies') {
  const cluster = params[0];

  let sum = 0;
  
  for (let i = 0; i < cluster.length; i++) {
    sum += (keyFrequency[cluster.charAt(i)] || 0);
  }

  console.log(sum);
}

if (mode === 'list_frequencies') {
  const cluster = params[0];

  const result = {};
  
  for (let i = 0; i < cluster.length; i++) {
    result[cluster.charAt(i)] = (keyFrequency[cluster.charAt(i)] || 0);
  }

  Object.entries(result)
    .sort(([c1, f1], [c2, f2]) => f1 - f2)
    .forEach(([key, frequency]) => {
      console.log(`${key} ${frequency}`);
    });
}
