const { isSchemeNumber, isSchemeList } = require("./scheme_types");
const { add, mul, div, sub, gt, lt, gtequal, ltequal, numberEqual, modulo, remainder } = require("./scheme_math");

function Environment(names, vals, outer) {
  this.outer = outer;
  this.frame = {};
  names.forEach((name, index) => this.frame[name] = vals[index]);
}

Environment.prototype.find = function(name) {
  if (this.frame[name] !== undefined) {
    return this;
  } else if (!this.outer) {
    throw new Error(`unbound variable: ${name}`);
  } else {
    return this.outer.find(name);
  }
};

Environment.prototype.bindValue = function(name, value) {
  this.frame[name] = value;
};

// Minimial standard bindings just for testing the repl
const standardBindings = {
  '+': add, '*': mul, '/': div, '-': sub,
  '>': gt, '<': lt, '>=': gtequal, '<=': ltequal, '=': numberEqual,
  'pi': Math.PI, abs: Math.abs, max: Math.max, min: Math.min,
  'modulo': modulo, 'remainder': remainder,
  'begin': (...x) => x[x.length - 1],
  'sequence': (...x) => x[x.length - 1],
  '#t': true,
  '#f': false,
  'not': x => x === false,
  'car': x => x[0],
  'cdr': x => x[1],
  'cons': (x, y) => [x, y],
  'null?': x => x.length === 0,
  'number?': x => isSchemeNumber(x),
  'pair?': x => isSchemeList(x) && x.length === 2,
};

const GLOBAL_ENV = new Environment(Object.keys(standardBindings), 
  Object.values(standardBindings), null);

module.exports = { GLOBAL_ENV, Environment };