const { passwords } = require("./passwords");

const validPasswords = (passwordArr) => {
  const valids = [];

  passwordArr.forEach((item) => {
    const [min, max] = item[0].split("-");
    const [, char, pw] = item;

    const reqChars = pw.split("").filter((c) => c === char);

    if (reqChars.length >= min && reqChars.length <= max) {
      valids.push(item);
    }
  });
  return valids.length;
};

// console.log(validPasswords(passwords));

const validPasswords2 = (passwordArr) => {
  const xor = (a, b) => {
    if (a && b) return false;
    if (a || b) return true;
    return false;
  };

  const valids = [];

  passwordArr.forEach((item) => {
    const [first, last] = item[0].split("-");
    const [, char, pw] = item;

    const firstChar = pw[first - 1];
    const lastChar = pw[last - 1];

    if (xor(firstChar === char, lastChar === char)) {
      valids.push(item);
    }
  });

  return valids.length;
};

// console.log(validPasswords2(passwords));
