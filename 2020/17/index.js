const getNeighborCoords = (coords) => {
  if (!Array.isArray(coords)) {
    coords = coords.split(",").map((c) => Number(c));
  }

  let neighborCoords = [];
  for (let x = coords[0] - 1; x < coords[0] + 2; x++) {
    for (let y = coords[1] - 1; y < coords[1] + 2; y++) {
      for (let z = coords[2] - 1; z < coords[2] + 2; z++) {
        neighborCoords.push([x, y, z]);
      }
    }
  }

  const curCordIdx = neighborCoords.findIndex((coord) => {
    return JSON.stringify(coord) === JSON.stringify(coords);
  });

  neighborCoords.splice(curCordIdx, 1);
  return neighborCoords;
};

const getNeighborCoordsPart2 = (coords) => {
  if (!Array.isArray(coords)) {
    coords = coords.split(",").map((c) => Number(c));
  }

  let neighborCoords = [];
  for (let x = coords[0] - 1; x < coords[0] + 2; x++) {
    for (let y = coords[1] - 1; y < coords[1] + 2; y++) {
      for (let z = coords[2] - 1; z < coords[2] + 2; z++) {
        for (let w = coords[3] - 1; w < coords[3] + 2; w++) {
          neighborCoords.push([x, y, z, w]);
        }
      }
    }
  }

  const curCordIdx = neighborCoords.findIndex((coord) => {
    return JSON.stringify(coord) === JSON.stringify(coords);
  });

  neighborCoords.splice(curCordIdx, 1);
  return neighborCoords;
};

const getActiveNeighborCount = (cubes, coords) => {
  return coords.reduce((acc, cur) => {
    const coordString = cur.join(",");
    if (cubes[coordString] === "#") {
      acc++;
    }
    return acc;
  }, 0);
};

const getNewState = (neighborCount, state) => {
  if (!state) state = ".";

  if ((state === "#" && neighborCount < 2) || neighborCount > 3) {
    return ".";
  }

  if (state === "." && neighborCount === 3) {
    return "#";
  }

  return state;
};

const solve1 = (input) => {
  let activeCubes = input.reduce((coords, cur, y) => {
    for (const [x, state] of cur.entries()) {
      if (state === "#") coords[`${x},${y},0`] = state;
    }
    return coords;
  }, {});

  let i = 0;
  while (i < 6) {
    let prevActiveCubes = { ...activeCubes };
    for (const coord in activeCubes) {
      const neiborghs = getNeighborCoords(coord);
      for (const neiborgh of neiborghs) {
        const neiborghs2 = getNeighborCoords(neiborgh);
        const activeNeighborCount2 = getActiveNeighborCount(
          prevActiveCubes,
          neiborghs2
        );
        activeCubes[neiborgh] = getNewState(
          activeNeighborCount2,
          activeCubes[neiborgh]
        );
      }

      const activeNeighborCount = getActiveNeighborCount(
        prevActiveCubes,
        neiborghs
      );
      activeCubes[coord] = getNewState(activeNeighborCount, activeCubes[coord]);
    }
    i++;
  }

  let count = 0;
  for (const [_, state] of Object.entries(activeCubes)) {
    if (state === "#") {
      count++;
    }
  }
  console.log(count);
};

const solve2 = (input) => {
  let activeCubes = input.reduce((coords, cur, y) => {
    for (const [x, state] of cur.entries()) {
      if (state === "#") coords[`${x},${y},0,0`] = state;
    }
    return coords;
  }, {});

  let i = 0;
  while (i < 6) {
    let prevActiveCubes = { ...activeCubes };
    for (const coord in activeCubes) {
      const neiborghs = getNeighborCoordsPart2(coord);
      for (const neiborgh of neiborghs) {
        const neiborghs2 = getNeighborCoordsPart2(neiborgh);
        const activeNeighborCount2 = getActiveNeighborCount(
          prevActiveCubes,
          neiborghs2
        );
        activeCubes[neiborgh] = getNewState(
          activeNeighborCount2,
          activeCubes[neiborgh]
        );
      }

      const activeNeighborCount = getActiveNeighborCount(
        prevActiveCubes,
        neiborghs
      );
      activeCubes[coord] = getNewState(activeNeighborCount, activeCubes[coord]);
    }
    i++;
  }

  let count = 0;
  for (const [_, state] of Object.entries(activeCubes)) {
    if (state === "#") {
      count++;
    }
  }
  console.log(count);
};

const inputExample = `.#.
..#
###`
  .split("\n")
  .map((row) => row.split(""));

const input = `..#..#..
.###..#.
#..##.#.
#.#.#.#.
.#..###.
.....#..
#...####
##....#.`
  .split("\n")
  .map((row) => row.split(""));

// solve1(inputExample);
// solve1(input);
// solve2(inputExample);
solve2(input);
