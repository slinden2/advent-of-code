const { seats, seatsExample } = require("./seats");

const solve1 = (seats) => {
  const seatArr = seats.split("\n").map((row) => row.split(""));

  const previousRounds = [];
  let prevOccupiedSeats = "";
  let curOccupiedSeats = "";

  do {
    let prevRoundArr = previousRounds[previousRounds.length - 1];
    let curRoundArr;
    if (!previousRounds.length) {
      prevRoundArr = [...seatArr.map((row) => row.map((c) => c))];
      curRoundArr = [...prevRoundArr.map((row) => row.map((c) => c))];
    } else {
      curRoundArr = JSON.parse(JSON.stringify(prevRoundArr));
    }

    prevOccupiedSeats = curOccupiedSeats;
    for (let i = 0; i < curRoundArr.length; i++) {
      const prevRow = prevRoundArr[i - 1];
      const curRow = prevRoundArr[i];
      const nextRow = prevRoundArr[i + 1];
      for (let j = 0; j < curRoundArr.length; j++) {
        const prevRowLeft = prevRow && prevRow[j - 1];
        const prevRowCur = prevRow && prevRow[j];
        const prevRowRight = prevRow && prevRow[j + 1];
        const curRowLeft = curRow[j - 1];
        const curRowCur = curRow[j];
        const curRowRight = curRow[j + 1];
        const nextRowLeft = nextRow && nextRow[j - 1];
        const nextRowCur = nextRow && nextRow[j];
        const nextRowRight = nextRow && nextRow[j + 1];

        const occupiedSeatsAroundArr = [
          prevRowLeft,
          prevRowCur,
          prevRowRight,
          curRowLeft,
          curRowRight,
          nextRowLeft,
          nextRowCur,
          nextRowRight,
        ].filter((seat) => {
          if (seat === "#") return true;
          else return false;
        });

        const occupiedSeatsAround = occupiedSeatsAroundArr.length;

        if (curRowCur === "L" && occupiedSeatsAround === 0) {
          curRoundArr[i][j] = "#";
        } else if (curRowCur === "#" && occupiedSeatsAround > 3) {
          curRoundArr[i][j] = "L";
        }
      }
    }

    previousRounds.push(curRoundArr);

    curOccupiedSeats = JSON.stringify(curRoundArr);
  } while (prevOccupiedSeats !== curOccupiedSeats);
  console.log(
    previousRounds[previousRounds.length - 1]
      .map((row) => row.join(""))
      .join("")
      .split("")
      .filter((char) => char === "#").length
  );
};

const solve2 = (seats) => {};

solve1(seats);
// solve2(seatsExample);
