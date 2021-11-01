function isSchemeNumber(str) {
  // TODO: For now this will only return true if the string can be converted
  //       to a valid JavaScript number. Need to improve this to handle Scheme
  //       number literals
  return !Number.isNaN(Number(str));
}

function schemeNumber(str) {
  return Number(str);
}

function schemeSymbol(str) {
  return str;
}

module.exports = { isSchemeNumber, schemeNumber, schemeSymbol };