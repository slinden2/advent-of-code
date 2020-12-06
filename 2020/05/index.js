const { boardingPasses, boardingPassExample } = require("./boardingPasses");

const getNewRows = (letter, rowRange) => {
  const [lowerLimit, upperLimit] = rowRange;
  const newRowRange = [];

  if (letter === "F" || letter === "L") {
    const newUpperLimit = upperLimit - Math.ceil((upperLimit - lowerLimit) / 2);
    newRowRange.push(lowerLimit, newUpperLimit);
  }

  if (letter === "B" || letter === "R") {
    const newLowerLimit = lowerLimit + Math.ceil((upperLimit - lowerLimit) / 2);
    newRowRange.push(newLowerLimit, upperLimit);
  }

  return newRowRange;
};

const getSeatIds = (boardingPassInput) => {
  const bps = boardingPassInput.split("\n");

  const decryptedBps = bps.map((bp) => {
    let rowRange = [0, 127];
    let colRange = [0, 7];
    let rowResult = null;
    let colResult = null;

    const bpArr = bp.split("");
    bpArr.slice(0, 7).forEach((l, i) => {
      rowRange = getNewRows(l, rowRange);
      if (i === 6) {
        rowResult = rowRange[0];
      }
    });
    bpArr.slice(7).forEach((l, i) => {
      colRange = getNewRows(l, colRange);
      if (i === 2) {
        colResult = colRange[0];
      }
    });
    const seatId = rowResult * 8 + colResult;
    return seatId;
  });
  return decryptedBps.sort((a, b) => a - b);
};

const getMyBoardingPass = (seatIds) => {
  const firstSeat = seatIds[0];
  const lastSeat = seatIds[seatIds.length - 1];

  let sumArr = [];

  for (let i = firstSeat; i <= lastSeat; i++) {
    sumArr.push(i);
  }

  const totalSum = sumArr.reduce((acc, cur) => acc + cur, 0);
  const seatSum = seatIds.reduce((acc, cur) => acc + cur, 0);
  return totalSum - seatSum;
};

console.log(getMyBoardingPass(getSeatIds(boardingPasses)));
