const divider = 20201227;
const subject = 7;

const transform = (subject, turns) => {
  let value = 1;
  for (let i = 1; i <= turns; i++) {
    value = (value * subject) % divider;
  }
  return value;
};

const solve1 = (input) => {
  const [cardKey, doorKey] = input.split("\n").map((x) => parseInt(x));
  const maxTurns = 10000000;
  const rainbowTable = new Array(maxTurns + 1);
  rainbowTable[0] = 1;

  for (let i = 1; i <= maxTurns; i++) {
    rainbowTable[i] = (rainbowTable[i - 1] * subject) % divider;
  }

  const cardTurn = rainbowTable.indexOf(cardKey);
  const doorTurn = rainbowTable.indexOf(doorKey);
  console.log(cardTurn, doorTurn);
  console.log(rainbowTable.slice(0, 20));
  const encryptionKey = transform(doorKey, cardTurn);
  console.log(encryptionKey);
};

const solve2 = (input) => {};

const inputExample = `5764801
17807724`;

const input = `17773298
15530095`;

// solve1(inputExample);
solve1(input);
// solve2(inputExample)
// solve2(input)
