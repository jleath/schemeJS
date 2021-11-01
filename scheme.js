const SchemeParser = require('./scheme_parser.js');
const SchemeEnvironment = require('./scheme_environment.js');
const SchemeTypes = require('./scheme_types.js');
const rl = require('readline-sync');

function repl(prompt = 'schemeJS >> ') {
  try {
    let input = rl.question(prompt);
    let parsed = SchemeParser.parseScheme(input);
    let value = schemeEval(parsed);
    if (value) {
      console.log(schemeStr(value));
    }
  } catch (error) {
    console.error(error);
  }
  repl(prompt);
}

function schemeStr(expression) {
  if (SchemeTypes.isSchemeList(expression)) {
    return '(' + expression.map(schemeStr).join(' ') + ')';
  } else {
    return expression.toString();
  }
}

function handleDefine(name, exp, env) {
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

function schemeEval(exp, env = SchemeEnvironment.GLOBAL_ENV) {
  if (SchemeTypes.isSchemeList(exp)) {
    let op = exp[0];
    let args = exp.slice(1);
    if (op === 'define') {
      return handleDefine(args[0], args[1], env);
    } else if (op === 'lambda') {
      return handleLambda(args[0], args[1], env);
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