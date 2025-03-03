const { evaluateLayout } = require("./evaluate-layout");

function chooseOneFromArray(array) {
  const index = Math.floor(Math.random() * array.length);
  const result = array[index];
  array.splice(index, 1);
  return result;
}

function chooseOneFromArrayWithoutRemoving(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function swapKeys(smallerIndex, biggerIndex, layout) {
  return layout.substring(0, smallerIndex) + layout.charAt(biggerIndex)
    + layout.substring(smallerIndex + 1, biggerIndex) + layout.charAt(smallerIndex)
    + layout.substring(biggerIndex + 1);
}

function findLocalBest(candidate) {
  let currentBestLayout = candidate.layout;
  let currentBestScore = candidate.score;
  let swapped = false;

  while (true) {
    swapped = false;

    const possibleSwaps = [];
    for (let i = 0; i < currentBestLayout.length - 1; i++) {
      for (let j = i + 1; j < currentBestLayout.length; j++) {
        if (possiblePositionForSemiColon.includes(i) && currentBestLayout.charAt(j) === ";") {
          possibleSwaps.push([i, j]);
        } else if (currentBestLayout.charAt(i) === ";" && possiblePositionForSemiColon.includes(j)) {
          possibleSwaps.push([i, j]);
        } else if (currentBestLayout.charAt(i) !== ";" && currentBestLayout.charAt(j) !== ";" ) {
          possibleSwaps.push([i, j]);
        }
      }
    }

    while (possibleSwaps.length > 0) {
      const index = Math.floor(Math.random() * possibleSwaps.length);
      const [i, j] = possibleSwaps[index];
      possibleSwaps.splice(index, 1);
      const newLayout = swapKeys(i, j, currentBestLayout);

      const newScore = evaluateLayout(newLayout);

      if (newScore < currentBestScore) {
        currentBestLayout = newLayout;
        currentBestScore = newScore;

        swapped = true;

        break;
      }
    }

    if (!swapped) {
      break;
    }
  }

  return { layout: currentBestLayout, score: currentBestScore };
}

const possiblePositionForSemiColon = [0, 1, 3, 5, 11, 17, 20, 23];

function generateLayoutRandomly() {
  const keys = [
    "a", "b", "c", "d", "e", "f", "g",
    "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
  ];

  const semiColonPosition = chooseOneFromArrayWithoutRemoving(possiblePositionForSemiColon);
  let result = "";

  while (keys.length > 0) {
    if (result.length !== semiColonPosition) {
      const key = chooseOneFromArray(keys);
      result += key;
    } else {
      result += ";";
    }
  }

  if (result.length === semiColonPosition) {
    result += ";";
  }

  return result;
}

(() => {
  const generationLength = 20;
  let generationsLeft = 100;
  let currentGeneration = [];

  for (let i = 0; i < generationLength; i++) {
    const layout = generateLayoutRandomly();
    const score = evaluateLayout(layout);
    currentGeneration.push({ layout, score });
  }

  console.log("First generation:");
  console.log(currentGeneration);

  while (generationsLeft > 0) {
    // Breeding:
    const newGeneration = [...currentGeneration];
    
    while (currentGeneration.length >= 2) {
      const motherIndex = Math.floor(Math.random() * currentGeneration.length);
      const mother = currentGeneration[motherIndex];
      currentGeneration.splice(motherIndex, 1);

      const fatherIndex = Math.floor(Math.random() * currentGeneration.length);
      const father = currentGeneration[fatherIndex];
      currentGeneration.splice(fatherIndex, 1);

      let keys = [
        "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z",
        ";",
      ];
      const childGene = [];
      const keepMothersSemiColon = Math.random() >= 0.5;
      let freeGeneticPositions = [];
      let restOfPositions = [];

      for (let i = 0; i < mother.layout.length; i++) {
        if (mother.layout.charAt(i) === ";") {
          if (keepMothersSemiColon) {
            childGene[i] = ";";
            keys = keys.filter((key) => key !== childGene[i]);
          } else {
            childGene[i] = father.layout.charAt(i);
            keys = keys.filter((key) => key !== childGene[i]);
          }
        } else if (father.layout.charAt(i) === ";") {
          if (keepMothersSemiColon) {
            childGene[i] = mother.layout.charAt(i);
            keys = keys.filter((key) => key !== childGene[i]);
          } else {
            childGene[i] = ";";
            keys = keys.filter((key) => key !== childGene[i]);
          }
        } else {
          freeGeneticPositions.push(i);
        }
      }

      restOfPositions = [];
      for (const position of freeGeneticPositions) {
        if (mother.layout.charAt(position) === father.layout.charAt(position)) {
          childGene[position] = mother.layout.charAt(position);
          keys = keys.filter((key) => key !== childGene[position]);
        } else {
          restOfPositions.push(position);
        }
      }
      
      freeGeneticPositions = restOfPositions;
      while (freeGeneticPositions.length > 0) {
        const index = Math.floor(Math.random() * freeGeneticPositions.length);
        const position = freeGeneticPositions[index];
        freeGeneticPositions.splice(index, 1);

        const mothersGene = mother.layout.charAt(position);
        const fathersGene = father.layout.charAt(position);
        const takeMothersGene = Math.random() >= 0.5;

        let geneToPass = takeMothersGene ? mothersGene : fathersGene;

        if (!keys.includes(geneToPass)) {
          const keyIndex = Math.floor(Math.random() * keys.length);
          geneToPass = keys[keyIndex];
        }

        childGene[position] = geneToPass;
        keys = keys.filter((key) => key !== childGene[position]);
      }

      const layout = childGene.join("");
      const score = evaluateLayout(layout);
      const child = findLocalBest({ layout, score });

      if (newGeneration.every((individual) => individual.layout !== child.layout)) {
        newGeneration.push(child);
      }
    }

    // Selection:
    newGeneration.sort((a, b) => a.score - b.score);

    console.log("Generations left: " + generationsLeft);
    console.log(newGeneration);

    currentGeneration = newGeneration.slice(0, generationLength);

    if (currentGeneration.length === 1) {
      break;
    }

    generationsLeft--;
  }
})();
