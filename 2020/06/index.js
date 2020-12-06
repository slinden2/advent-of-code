const {
  customsDeclarationForms,
  customsDeclarationFormsExample,
} = require("./customsDeclarationForms");

const sumYesAnswersPart1 = (customsInput) => {
  const answerArr = customsInput.split("\n\n").map((a) => a.replace(/\n/g, ""));
  const equalAnswerArr = answerArr.map((a) => {
    return Array.from(new Set(a.split(""))).length;
  });
  return equalAnswerArr.reduce((acc, cur) => acc + cur);
};

console.log(sumYesAnswersPart1(customsDeclarationForms));

const sumYesAnswersPart2 = (customsInput) => {
  const answerArr = customsInput
    .split("\n\n")
    .map((group) => group.split("\n"))
    .map((group) => {
      const personCount = group.length;
      const answerArr = group
        .join("")
        .split("")
        .reduce((acc, cur) => {
          if (acc.hasOwnProperty(cur)) {
            acc[cur] += 1;
          } else {
            acc = { ...acc, [cur]: 1 };
          }

          if (acc[cur] === personCount) {
            acc.totalCount = acc.totalCount ? acc.totalCount + 1 : 1;
          }

          return acc;
        }, {});
      return answerArr;
    })
    .reduce((acc, cur) => acc + (cur.totalCount ? cur.totalCount : 0), 0);

  return answerArr;
};

console.log(sumYesAnswersPart2(customsDeclarationForms));
