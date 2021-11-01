const { isSchemeNumber } = require("./scheme_types");

module.exports = {
  add(...args) {
    return args.reduce((result, curr) => result + curr, 0);
  },
  sub(...args) {
    return args.reduce((result, curr) => result - curr, 0);
  },
  mul(...args) {
    return args.reduce((result, curr) => result * curr, 1);
  },
  div(...args) {
    return args.reduce((result, curr) => {
      if (curr === 0) throw new Error('division by zero');
      return result / curr;
    }, 1);
  },
  gt(...args) {
    for (let i = 1; i < args.length; i += 1) {
      if (args[i - 1] <= args[i]) return false;
    }
    return true;
  },
  lt(...args) {
    for (let i = 1; i < args.length; i += 1) {
      if (args[i - 1] >= args[i]) return false;
    }
    return true;
  },
  gtequal(...args) {
    for (let i = 1; i < args.length; i += 1) {
      if (args[i - 1] > args[i]) return false;
    }
    return true;
  },
  ltequal(...args) {
    for (let i = 1; i < args.length; i += 1) {
      if (args[i - 1] > args[i]) return false;
    }
    return true;
  },
  numberEqual(...args) {
    for (let i = 1; i < args.length; i += 1) {
      if (!isSchemeNumber(args[i - 1])) throw new Error('= is only valid for numbers');
      if (args[i] !== args[i - 1]) return false;
    }
    return true;
  },

  remainder: (x, y) => x % y,
  modulo: (x, y) => ((x % y) + y) % y,
};