const { luggageRules, luggageRulesExample } = require("./luggageRules");

const generateLuggageMap = (ruleArray) => {
  return ruleArray.reduce((acc, cur) => {
    const [rawKey, contains] = cur.split("contain");
    const key = rawKey.slice(0, rawKey.length - 6);
    const bags = contains.split(",").map((bag) => {
      if (bag.search("no other bags") !== -1) {
        return {};
      }
      const qty = Number(bag[1]);
      const bagIndex = bag.search("bag");
      const bagType = bag.slice(3, bagIndex - 1);
      return { type: bagType, qty };
    });

    bags.forEach((bag) => {
      acc[key] = { ...acc[key], [bag.type]: bag.qty };
      if (!Object.keys(bag).length) {
        acc[key] = {};
      }
    });

    return acc;
  }, {});
};

const hasBag = (map, outerBag, innerBag) => {
  if (map[outerBag][innerBag]) {
    return true;
  }

  return Object.keys(map[outerBag]).reduce((acc, key) => {
    return acc || hasBag(map, key, innerBag);
  }, false);
};

const numBags = (map, bag) => {
  return Object.keys(map[bag]).reduce((acc, key) => {
    return acc + map[bag][key] * (1 + numBags(map, key));
  }, 0);
};

const getBags = (luggageRules) => {
  const ruleArr = luggageRules.split("\n");
  const bagMap = generateLuggageMap(ruleArr);

  const count = Object.keys(bagMap).reduce((count, key) => {
    return count + hasBag(bagMap, key, "shiny gold");
  }, 0);
  console.log(count);

  const count2 = numBags(bagMap, "shiny gold");
  console.log(count2);

  return count;
};

getBags(luggageRules);
