const { expenseReport } = require("./expense");

const findTwoEntries = (expenseReport) => {
  const sum = 2020;
  const correctNums = [];

  expenseReport.every((num1) => {
    expenseReport.slice(1).every((num2) => {
      if (num1 + num2 === sum) {
        correctNums.push(num1);
        correctNums.push(num2);
        return false;
      }
      return num2;
    });

    if (correctNums.length) {
      return false;
    }
    return num1;
  });

  return correctNums[0] * correctNums[1];
};

const findThreeEntries = (expenseReport) => {
  const sum = 2020;
  const correctNums = [];

  expenseReport.every((num1) => {
    expenseReport.slice(1).every((num2) => {
      expenseReport.slice(2).every((num3) => {
        if (num1 + num2 + num3 === sum) {
          correctNums.push(num1);
          correctNums.push(num2);
          correctNums.push(num3);
          return false;
        }
        return num3;
      });
      if (correctNums.length) {
        return false;
      }
      return num2;
    });
    if (correctNums.length) {
      return false;
    }
    return num1;
  });

  return correctNums[0] * correctNums[1] * correctNums[2];
};

console.log(findThreeEntries(expenseReport));
