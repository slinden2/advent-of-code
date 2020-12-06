const { trees } = require("./trees");

const countTrees = (forest, routes) => {
  // Array of treeCount per route
  const treeArr = [];
  routes.forEach((route) => {
    const [right, down] = route;
    const requiredWidth = forest.length * right;
    const widthFactor = Math.ceil(requiredWidth / forest[0].length);

    const fullForest = forest.map((row) => {
      let newRow = "";
      for (i = 0; i < widthFactor; i++) {
        newRow += row;
      }
      return newRow;
    });

    // Horizontal index
    let hi = 0;
    let treeCount = 0;
    fullForest.forEach((row, vi) => {
      // Skip first row or take multiple steps down
      if (vi === 0 || vi % down) {
        return;
      }

      // Increment steps to the right
      hi += right;

      if (row[hi] === "#") {
        treeCount++;
      }
    });
    treeArr.push(treeCount);
  });

  // Multiply treeCounts together
  return treeArr.reduce((acc, cur) => acc * cur, 1);
};

const forest = trees.split("\n");

const routes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

console.log(countTrees(forest, routes));
