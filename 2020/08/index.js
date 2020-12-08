const { bootCode, bootCodeExample } = require("./bootCode");

const getBootInstructions = (bootCode) => {
  return bootCode.split("\n").map((inst) => {
    const [instruction, value] = inst.split(" ");
    return [instruction, Number(value)];
  });
};

const solve1 = (bootCode) => {
  const instructionArr = getBootInstructions(bootCode);

  const runIndices = [];
  let i = 0;
  let acc = 0;
  while (!runIndices.includes(i) && i < instructionArr.length) {
    runIndices.push(i);
    const [instruction, value] = instructionArr[i];

    switch (instruction) {
      case "nop":
        i++;
        break;
      case "acc":
        acc += value;
        i++;
        break;
      case "jmp":
        i += value;
        break;
      default:
        i++;
        break;
    }
  }
  console.log("solve1 final acc", acc);
};

const solve2 = (bootCode) => {
  const instructionArr = getBootInstructions(bootCode);

  const indicesToChange = [];
  instructionArr.forEach((inst, i) => {
    if (inst[0] === "jmp") {
      indicesToChange.push(i);
    }
  });

  for (const indexToChange of indicesToChange) {
    const newInstructionArr = JSON.parse(JSON.stringify(instructionArr));

    newInstructionArr[indexToChange][0] = "nop";

    const runIndices = [];
    let i = 0;
    let acc = 0;
    while (!runIndices.includes(i) && i < newInstructionArr.length) {
      runIndices.push(i);
      const [instruction, value] = newInstructionArr[i];

      switch (instruction) {
        case "nop":
          i++;
          break;
        case "acc":
          acc += value;
          i++;
          break;
        case "jmp":
          i += value;
          break;
        default:
          i++;
          break;
      }
    }

    if (i === newInstructionArr.length) {
      console.log("solve2 final acc", acc);
      break;
    }
  }
};

solve1(bootCode);
solve2(bootCode);
