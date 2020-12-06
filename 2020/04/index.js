const { passports } = require("./passports");

const reqKeys = ["eyr", "pid", "hgt", "byr", "ecl", "iyr", "hcl"];

const passportIdValid = (ppObj) => {
  for (const key of reqKeys) {
    if (!ppObj.hasOwnProperty(key)) {
      return false;
    }
  }

  const byr = ppObj.byr.length === 4 && ppObj.byr >= 1920 && ppObj.byr <= 2002;
  const iyr = ppObj.iyr.length === 4 && ppObj.iyr >= 2010 && ppObj.iyr <= 2020;
  const eyr = ppObj.eyr.length === 4 && ppObj.eyr >= 2020 && ppObj.eyr <= 2030;

  let hgt = false;
  if (/^\d{2,3}(cm|in)$/.test(ppObj.hgt)) {
    const value = ppObj.hgt.slice(0, ppObj.hgt.length - 2);
    hgt =
      ppObj.hgt.slice(ppObj.hgt.length - 2) === "cm"
        ? value >= 150 && value <= 193
        : value >= 59 && value <= 76;
  }

  const hcl = /^#[0-9a-f]{6}$/.test(ppObj.hcl);
  const ecl = /(amb|blu|brn|gry|grn|hzl|oth)/.test(ppObj.ecl);
  const pid = /^[0-9]{9}$/.test(ppObj.pid);

  return byr && iyr && eyr && hgt && hcl && ecl && pid;
};

const validPassports = (passports) => {
  const validPasswordsCount = passports
    .split("\n\n")
    .map((passport) => {
      const passportObject = passport
        .split("\n")
        .join(" ")
        .split(" ")
        .reduce((acc, cur) => {
          return { ...acc, [cur.slice(0, 3)]: cur.slice(4) };
        }, {});
      return passportObject;
    })
    .filter((ppObj) => {
      if (Object.keys(ppObj).length < 7 || !passportIdValid(ppObj)) {
        return false;
      }
      return true;
    }).length;

  return validPasswordsCount;
};

console.log(validPassports(passports));
