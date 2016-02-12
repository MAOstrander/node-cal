"use strict";
const createMonth = require('./month.js');
const processArgs = require('./processArgs.js');
const justYear = require('./year.js');
var year;
const exitCode = 64;

const [,, ...args] = process.argv;
let os = 'linux'
if (process.platform === 'darwin') {
  os = 'darwin';
}

if (args.length === 2) {
  try {
    var month = processArgs.checkMonth(args[0]);
    year = processArgs.checkYear(parseInt(args[1]));
  } catch (e) {
    console.log(e);
    process.exit(exitCode);
  }

  console.log(`${createMonth.joinOutput(year, month, os)}`);

} else if (args.length === 1) {
  try {
    year = processArgs.checkYear(parseInt(args[0]));
  } catch (e) {
    console.log(e);
    process.exit(exitCode);
  }
  const fullCal = justYear.outputFullCal(year, os);

  console.log(fullCal);

} else if (args.length === 0) {
  const timeNow = new Date();
  const thisMonth = timeNow.getMonth() + 1;
  const thisYear = timeNow.getFullYear();

  console.log(createMonth.joinOutput(thisYear, thisMonth, os));

} else {
  console.log("Syntax not supported: Please enter either a [Year], or a [Month] [Year]");
}
