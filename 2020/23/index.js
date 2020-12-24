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

const solve2 = (input) => {};

const inputExample = `389125467`;

const input = `586439172`;

// solve1(inputExample);
solve1(input);
// solve2(inputExample)
// solve2(input)
