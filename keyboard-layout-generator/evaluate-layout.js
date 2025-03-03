const comboSpeedRecorded = require("../key-speed-recorder/result.json");
const comboSpeedGenerated = require("../key-speed-generator/result.json");
const comboFrequency = require("../merged-key-combo-frequency-unified.json").combinationFrequency;

const originalKeyPosition = "qwertyuiopasdfghjkl;zxcvbnm";

const comboReplacement = {
  " q": "aq", "q ": "qa",
  " w": "sw", "w ": "ws",
  " e": "de", "e ": "ed",
  " r": "fr", "r ": "rf",
  " t": "ft", "t ": "tf",
  " y": "jy", "y ": "yj",
  " u": "ju", "u ": "uj",
  " i": "ki", "i ": "ik",
  " o": "lo", "o ": "ol",
  " p": ";p", "p ": "p;",
  " a": "aa", "a ": "aa",
  " s": "ss", "s ": "ss",
  " d": "dd", "d ": "dd",
  " f": "ff", "f ": "ff",
  " g": "fg", "g ": "gf",
  " h": "jh", "h ": "hj",
  " j": "jj", "j ": "jj",
  " k": "kk", "k ": "kk",
  " l": "ll", "l ": "ll",
  " ;": ";;", "; ": ";;",
  " z": "az", "z ": "za",
  " x": "sx", "x ": "xs",
  " c": "dc", "c ": "cd",
  " v": "fv", "v ": "vf",
  " b": "fb", "b ": "bf",
  " n": "jn", "n ": "nj",
  " m": "jm", "m ": "mj",
};

function evaluate22266333Cluster(layout) {
  const clusters = [
    layout.substring(0, 2).split(""),
    layout.substring(2, 4).split(""),
    layout.substring(4, 6).split(""),
    layout.substring(6, 12).split(""),
    layout.substring(12, 18).split(""),
    layout.substring(18, 21).split(""),
    layout.substring(21, 24).split(""),
    layout.substring(24, 27).split(""),
  ];

  let sum = 0;
  for (const cluster of clusters) {
    for (let i = 0; i < cluster.length - 1; i++) {
      for (let j = i + 1; j < cluster.length; j++) {
        const combo1 = cluster[i] + cluster[j];
        const combo2 = cluster[j] + cluster[i];

        sum += (comboFrequency[combo1] || 0) + (comboFrequency[combo2] || 0);
      }
    }
  }

  return sum;
}

function evaluateLayoutAccordingToRecordedSpeed(layout) {
  const keyLookup = buildKeyPositionLookup(layout);
  let sum = 0;
  for (const [combo, frequency] of Object.entries(comboFrequency)) {
    let positionCombo = keyLookup[combo.charAt(0)] + keyLookup[combo.charAt(1)];
    if (comboReplacement[positionCombo]) {
      positionCombo = comboReplacement[positionCombo];
    }

    sum += frequency * comboSpeedRecorded[positionCombo].avg;
  }

  return sum;
}

function evaluateLayoutAccordingToGeneratedSpeed(layout) {
  const keyLookup = buildKeyPositionLookup(layout);
  let sum = 0;
  for (const [combo, frequency] of Object.entries(comboFrequency)) {
    let positionCombo = keyLookup[combo.charAt(0)] + keyLookup[combo.charAt(1)];
    if (comboReplacement[positionCombo]) {
      positionCombo = comboReplacement[positionCombo];
    }

    sum += frequency * comboSpeedGenerated[positionCombo].avg;
  }

  return sum;
}

function buildKeyPositionLookup(layout) {
  const result = { " ": " " };
  
  for (let i = 0; i < layout.length; i++) {
    result[layout.charAt(i)] = originalKeyPosition.charAt(i);
  }

  return result;
}

module.exports = {
  evaluateLayout: evaluate22266333Cluster,
};
