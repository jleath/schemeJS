const SchemeTypes = require('./scheme_types.js');

function removeComments(program) {
  return program.replace(/;.*\n/g, "\n");
}

function expandDelimiters(program) {
  const DELIMITERS = ['(', ')'];
  let regex = new RegExp(`[${DELIMITERS.join('')}]`, 'gi');
  return program.replace(regex, ' $& ');
}

function tokenize(program) {
  program = removeComments(program);
  program = expandDelimiters(program);
  return program.split(/\s+/).filter(token => token);
}

function readExpression(tokens) {
  if (tokens.length === 0) {
    throw new Error('unexpected end of file');
  }
  let token = tokens.shift();
  if (token === '(') {
    let expression = [];
    while (tokens[0] !== ')') {
      expression.push(readExpression(tokens));
    }
    tokens.shift();
    return expression;
  } else if (token === ')') {
    throw new Error('unexpected )');
  } else {
    if (SchemeTypes.isSchemeNumber(token)) {
      return SchemeTypes.schemeNumber(token);
    } else {
      return SchemeTypes.schemeSymbol(token);
    }
  }
}

function parseScheme(program) {
  return readExpression(tokenize(program));
}

module.exports = { parseScheme };