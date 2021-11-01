const SchemeParser = require('./src/scheme_parser.js');
const SchemeEnvironment = require('./src/scheme_environment.js');
const SchemeTypes = require('./src/scheme_types.js');
const rl = require('readline-sync');

function repl(prompt = 'schemeJS >> ') {
  try {
    let input = rl.question(prompt);
    let parsed = SchemeParser.parseScheme(input);
    let value = schemeEval(parsed);
    console.log(schemeStr(value));
  } catch (error) {
    console.log(error);
  }
  repl(prompt);
}

function schemeStr(expression) {
  if (SchemeTypes.isSchemeList(expression)) {
    let str = expression.map(schemeStr).join(' ').replace(/\s*\(\)/g, '').trim();
    return '(' + str + ')';
  } else if (expression === true) {
    return '#t';
  } else if (expression === false) {
    return '#f';
  } else {
    return expression.toString();
  }
}

function handleDefine(name, exp, env) {
  if (SchemeTypes.isSchemeList(name)) {
    env.bindValue(name[0], handleLambda(name.slice(1), exp, env));
    return name[0];
  }
  env.bindValue(name, schemeEval(exp, env));
  return name;
}

function handleLambda(params, body, env) {
  return (...args) => {
    return schemeEval(body, new SchemeEnvironment.Environment(params, args, env));
  };
}

function handleProcedureCall(op, args, env) {
  let proc = schemeEval(op, env);
  args = args.map(arg => schemeEval(arg, env));
  return proc.apply(null, args);
}

function handleIf(test, expr1, expr2, env) {
  if (schemeEval(test, env) !== false) {
    return schemeEval(expr1, env);
  } else {
    return schemeEval(expr2, env);
  }
}

function handleCond(cases, env) {
  let lastExp;
  for (let i = 0; i < cases.length; i += 1) {
    let test = cases[i][0];
    let exp = cases[i][1];
    exp = lastExp;
    if (test === 'else') {
      if (i + 1 === cases.length) {
        return schemeEval(exp, env);
      } else {
        throw new Error('else must be last clause in cond');
      }
    } else if (schemeEval(test, env) !== false) {
      return schemeEval(exp, env);
    }
  }
  return schemeEval(lastExp, env);
}

function handleSet(name, exp, env) {
  env.find(name).bindValue(name, schemeEval(exp, env));
  return name;
}

function handleQuote(constant, env) {
  return constant;
}

function handleAnd(tests, env) {
  if (tests.length === 0) {
    return true;
  }
  let evaluated;
  for (let i = 0; i < tests.length; i += 1) {
    evaluated = schemeEval(tests[i], env);
    if (evaluated === false) {
      return evaluated;
    }
  }
  return evaluated;
}

function handleOr(tests, env) {
  if (tests.length === 0) {
    return false;
  }
  let evaluated;
  for (let i = 0; i < tests.length; i += 1) {
    evaluated = schemeEval(tests[i], env);
    if (evaluated !== false) {
      return evaluated;
    }
  }
  return evaluated;
}

function schemeEval(exp, env = SchemeEnvironment.GLOBAL_ENV) {
  if (SchemeTypes.isSchemeList(exp)) {
    let op = exp[0];
    let args = exp.slice(1);
    if (op === 'define') {
      return handleDefine(args[0], args[1], env);
    } else if (op === 'if') {
      return handleIf(args[0], args[1], args[2], env);
    } else if (op === 'cond') {
      return handleCond(args[0], env);
    } else if (op === 'lambda') {
      return handleLambda(args[0], args[1], env);
    } else if (op === 'set!') {
      return handleSet(args[0], args[1], env);
    } else if (op === 'quote') {
      return handleQuote(args[0], env);
    } else if (op === 'and') {
      return handleAnd(args, env);
    } else if (op === 'or') {
      return handleOr(args, env);
    } else {
      return handleProcedureCall(op, args, env);
    }
  } else if (SchemeTypes.isSchemeNumber(exp)) {
    return exp;
  } else {
    return env.find(exp).frame[exp];
  }
}

repl();