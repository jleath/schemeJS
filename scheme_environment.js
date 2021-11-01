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

function add(...args) {
  return args.reduce((result, curr) => result + curr, 0);
}

function mul(...args) {
  return args.reduce((result, curr) => result * curr, 1);
}

// Minimial standard bindings just for testing the repl
const standardBindings = {
  '+': add,
  '*': mul,
  'begin': x => x[x.length - 1],
  'pi': Math.PI,
};

const GLOBAL_ENV = new Environment(Object.keys(standardBindings), 
  Object.values(standardBindings), null);

module.exports = { GLOBAL_ENV, Environment };