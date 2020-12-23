const parseInput = (input) => {
  return input.split("\n\n").map((p) =>
    p
      .split("\n")
      .slice(1)
      .map((n) => Number(n))
  );
};

const combat = (deck1, deck2, recursive) => {
  const alreadyPlayed = new Set();

  while (deck1.length > 0 && deck2.length > 0) {
    const state = deck1.join(",") + "#" + deck2.join(",");
    if (alreadyPlayed.has(state)) {
      return {
        winner: 1,
        deck: deck1,
      };
    }
    alreadyPlayed.add(state);

    const card1 = deck1.shift();
    const card2 = deck2.shift();

    let winner;
    if (recursive && deck1.length >= card1 && deck2.length >= card2) {
      const { winner: player, deck } = combat(
        deck1.slice(0, card1),
        deck2.slice(0, card2)
      );
      winner = player;
    } else {
      winner = card1 > card2 ? 1 : 2;
    }

    if (winner === 1) {
      deck1.push(card1);
      deck1.push(card2);
    } else {
      deck2.push(card2);
      deck2.push(card1);
    }
  }

  return {
    winner: deck1.length > 0 ? 1 : 2,
    deck: deck1.length > 0 ? deck1 : deck2,
  };
};

const solve1 = (input) => {
  const playerScores = parseInput(input);
  const winner = combat(playerScores[0], playerScores[1], false);
  const res = [...winner.deck]
    .reverse()
    .reduce((acc, cur, i) => acc + cur * (i + 1), 0);
  console.log(res);
};

const solve2 = (input) => {
  const playerScores = parseInput(input);
  const winner = combat(playerScores[0], playerScores[1], true);
  const res = [...winner.deck]
    .reverse()
    .reduce((acc, cur, i) => acc + cur * (i + 1), 0);
  console.log(res);
};

const inputExample = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const input = `Player 1:
5
20
28
30
48
7
41
24
29
8
37
32
16
17
34
27
46
43
14
49
35
11
6
38
1

Player 2:
22
18
50
31
12
13
33
39
45
21
19
26
44
10
42
3
4
15
36
2
40
47
9
23
25`;

// solve1(inputExample);
// solve1(input);
// solve2(inputExample);
solve2(input);
