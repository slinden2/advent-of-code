const parseNotes = (input, hasX) => {
  const [earliestDeparture, busNotes] = input.split("\n");
  const busLines = busNotes.split(",");
  return [
    earliestDeparture,
    hasX ? busLines : busLines.filter((val) => val !== "x"),
  ];
};

const solve1 = (input) => {
  const [earliestDeparture, busLines] = parseNotes(input);
  const earliestBus = busLines.reduce((acc, cur) => {
    const waitTime = Math.abs(
      earliestDeparture - (Math.floor(earliestDeparture / cur) + 1) * cur
    );

    if (waitTime < acc.waitTime || !Object.keys(acc).length)
      acc = { id: cur, waitTime };
    return acc;
  }, {});

  console.log(earliestBus.id * earliestBus.waitTime);
  return earliestBus.id * earliestBus.waitTime;
};

// Brute force. Takes forever to solve, but gives correct answer.
const solve2 = (input) => {
  const [, busLines] = parseNotes(input, true);
  const idOffset = busLines
    .map((line, i) => ({ id: line, offset: i, timestamp: 0 }))
    .filter((obj) => obj.id !== "x");
  const smallestId = Math.min(...idOffset.map((bus) => Number(bus.id)));
  const smallestIdIndex = idOffset.findIndex(
    (bus) => Number(bus.id) === smallestId
  );

  while (true) {
    idOffset.forEach((bus) => {
      if (bus.timestamp <= idOffset[smallestIdIndex].timestamp) {
        bus.timestamp += Number(bus.id);
      }
    });

    // console.log(idOffset);

    const hasOriginalOffsets = idOffset.every((bus, i) => {
      if (i === 0) {
        return true;
      }

      if (bus.timestamp - idOffset[0].timestamp === bus.offset) {
        return true;
      } else {
        return false;
      }
    });

    if (hasOriginalOffsets) {
      break;
    }
  }

  console.log(idOffset);
};

const inputExample = `939
7,13,x,x,59,x,31,19`;

// 7,13,x,x,59,x,31,19

const input = `1000508
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,467,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,19,x,x,x,x,x,x,x,x,x,x,x,443,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`;

// solve1(inputExample);
// solve1(input);
// solve2(inputExample);
// solve2(input);
