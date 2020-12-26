const solve1 = (input) => {
  let circle = input.split("").map((x) => parseInt(x));
  const moves = 100;
  let currentCupValue = circle[0];
  let N = circle.length;

  for (let i = 0; i < moves; i++) {
    let currentCupIndex = circle.indexOf(currentCupValue);

    let picked = [];
    for (let j = 0; j < 3; j++) {
      let index = (currentCupIndex + 1) % N;
      if (index >= circle.length) {
        index = 0;
      }
      picked = picked.concat(circle.splice(index, 1));
    }

    currentCupIndex = circle.indexOf(currentCupValue);

    let destinationValue = circle[currentCupIndex] - 1;

    if (destinationValue < 1) destinationValue = 9;
    let destinationCup = circle.indexOf(destinationValue);

    while (destinationCup < 0) {
      destinationValue--;
      if (destinationValue < 1) destinationValue = 9;
      destinationCup = circle.indexOf(destinationValue);
    }

    circle.splice(destinationCup + 1, 0, ...picked);

    currentCupValue = circle[(circle.indexOf(currentCupValue) + 1) % N];
  }

  const indexOfOne = circle.indexOf(1);
  let i = (indexOfOne + 1) % N;
  const result = [];
  while (i != indexOfOne) {
    result.push(circle[i]);
    i = (i + 1) % N;
  }
  console.log(result.join``);
};

const solve2 = (input) => {
  const labels = input.split("").map(Number);
  const max = 1000000;
  const nextMap = {};
  for (let i = 0; i < max; i++) {
    nextMap[labels[i] || i + 1] = labels[i + 1] || i + 2;
  }
  nextMap[max] = labels[0];

  let curr = labels[0];
  for (let i = 0; i < 10000000; i++) {
    const pickup = [
      nextMap[curr],
      nextMap[nextMap[curr]],
      nextMap[nextMap[nextMap[curr]]],
    ];

    let dest = ((curr - 2 + max) % max) + 1;
    while (pickup.includes(dest)) {
      dest = ((dest - 2 + max) % max) + 1;
    }

    nextMap[curr] = nextMap[pickup[2]];
    const tmp = nextMap[dest];
    nextMap[dest] = pickup[0];
    nextMap[pickup[2]] = tmp;
    curr = nextMap[curr];
  }

  console.log(nextMap[1] * nextMap[nextMap[1]]);
};

const inputExample = `389125467`;

const input = `586439172`;

// solve1(inputExample);
// solve1(input);
// solve2(inputExample)
solve2(input);
