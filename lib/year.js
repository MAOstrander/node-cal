"use strict";

function createYearHeader (y) {
  let output = `                             ${y}\n\n`

  return output;
}

function reformatMonth() {
  var test = `This\nis\na\ntest`;
  var s = test.replace(/\n/g,'  ');

  return s;
}

module.exports = {
  createYearHeader: createYearHeader,
  reformatMonth: reformatMonth
}
