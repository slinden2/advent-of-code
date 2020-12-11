const { adapters, adaptersExample } = require("./adapters");

const solve1 = (adapters) => {
  const adapterArr = adapters.split("\n").map((v) => Number(v));
  const sortedAdapterArr = [...adapterArr].sort((a, b) => a - b);
  const oneJoltArr = [];
  const threeJoltArr = [];
  sortedAdapterArr.reduce((prev, cur) => {
    if (cur - prev === 1) {
      oneJoltArr.push(cur);
    } else {
      threeJoltArr.push(cur);
    }

    return cur;
  }, 0);
  console.log("oneJoltArr", oneJoltArr.length);
  console.log("threeJoltArr", threeJoltArr.length + 1);
  console.log(oneJoltArr.length * (threeJoltArr.length + 1));
};

const solve2 = (adapters) => {
  const adapterArr = adapters
    .split("\n")
    .map((v) => Number(v))
    .sort((a, b) => a - b);

  const prevMap = {};
  for (let i = 0; i < adapterArr.length; i++) {
    const cur = adapterArr[i];
    for (let j = 0; j < 3; j++) {
      const next = adapterArr[i + 1 + j];
      if (next - cur <= 3) {
        prevMap[next] = prevMap[next] || [];
        prevMap[next].push(cur);
      }
    }
  }

  const countMap = {};
  for (let i = 1; i < adapterArr.length; i++) {
    const n = adapterArr[i];
    const prevs = prevMap[n];
    for (let j = 0; j < prevs.length; j++) {
      const prev = prevs[j];
      if (prev === 1) {
        countMap[n] = (countMap[n] || 0) + 1;
      } else {
        countMap[n] = (countMap[n] || 0) + countMap[prev];
      }
    }
  }
  console.log(countMap);
  console.log(countMap[adapterArr[adapterArr.length - 1]]);
};

// solve1(adapters);
solve2(adapters);
