const { xmas, xmasExample } = require("./xmas");

const solve1 = (xmas, preamble) => {
  const numbersArr = xmas.split("\n").map((n) => Number(n));
  let corruptedValue = null;

  for (let i = preamble; i < numbersArr.length; i++) {
    const prevNumsArr = numbersArr.slice(i - preamble, i);
    const curValue = numbersArr[i];
    let valid = false;
    for (let j = 0; j < prevNumsArr.length - 1; j++) {
      for (let k = 1; k < prevNumsArr.length; k++) {
        if (curValue === prevNumsArr[j] + prevNumsArr[k]) {
          valid = true;
          break;
        }
      }
    }

    if (!valid) {
      corruptedValue = curValue;
      break;
    }
  }

  return corruptedValue;
};

const solve2 = (xmas, preamble) => {
  const numbersArr = xmas.split("\n").map((n) => Number(n));
  const corruptedValue = solve1(xmas, preamble);
  const index = numbersArr.findIndex((val) => val === corruptedValue);
  const newNumbersArr = numbersArr.slice(0, index);
  let finalArr = null;

  for (let i = 0; i < newNumbersArr.length; i++) {
    const sumArr = [];
    for (let j = 0; j < newNumbersArr.slice(i).length; j++) {
      const slicedArr = newNumbersArr.slice(i);
      sumArr.push(slicedArr[j]);
      const sum = sumArr.reduce((acc, cur) => acc + cur, 0);
      if (sum === corruptedValue) {
        finalArr = sumArr;
        break;
      }
      if (sum > corruptedValue) {
        break;
      }
    }

    if (finalArr) break;
  }

  const sortedFinalArr = [...finalArr].sort((a, b) => a - b);
  return sortedFinalArr[0] + sortedFinalArr[sortedFinalArr.length - 1];
};

// solve1(xmas, 25);
console.log(solve2(xmas, 25));
