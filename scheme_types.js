function isSchemeNumber(obj) {
  // TODO: For now this will only return true if the string can be converted
  //       to a valid JavaScript number. Need to improve this to handle Scheme
  //       number literals
  return !Number.isNaN(Number(obj));
}

function isSchemeList(obj) {
  return Array.isArray(obj);
}

function schemeNumber(obj) {
  return Number(obj);
}

function isSchemeSymbol(obj) {
  return typeof obj === 'string';
}

function schemeSymbol(obj) {
  return obj;
}

module.exports = { isSchemeNumber, schemeNumber, schemeSymbol, isSchemeSymbol,
  isSchemeList, };