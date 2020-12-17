const solve1 = (input) => {
  let spoken = [...input].reverse();
  let age;
  for (let i = 0; i < 2020 - input.length; i++) {
    const lastSpoken = spoken[0];
    const mentioned = spoken.slice(1).some((num) => num === lastSpoken);

    if (mentioned) {
      age = spoken.slice(1).findIndex((num) => num === lastSpoken) + 1;
    } else {
      age = 0;
    }

    spoken = [age, ...spoken];
  }
  console.log(spoken[0]);
};

const solve2 = (input) => {
  const spokenMap = input.reduce((acc, cur, i) => {
    acc[cur] = {
      turn: i + 1,
      lastTurn: i + 1,
      spoken: cur,
      mentionedOnce: true,
    };
    return acc;
  }, {});

  let spoken = [...input].reverse()[0];
  let age;
  for (let i = input.length + 1; i <= 30000000; i++) {
    const lastSpoken = spoken;
    age = spokenMap[lastSpoken].turn - spokenMap[lastSpoken].lastTurn;

    if (spokenMap[age]) {
      const lastTurn = spokenMap[age].turn;
      const turn = i;
      spokenMap[age] = { turn, lastTurn, spoken: age, mentionedOnce: false };
    } else {
      spokenMap[age] = {
        turn: i,
        lastTurn: i,
        spoken: age,
        mentionedOnce: true,
      };
    }
    spoken = age;
  }
  console.log("spoken", spoken);
};

const inputExample = `0,3,6`.split(",").map((v) => +v);

const input = `2,0,1,9,5,19`.split(",").map((v) => +v);

// solve1(inputExample);
// solve1(input);
// solve2(inputExample);
solve2(input);
