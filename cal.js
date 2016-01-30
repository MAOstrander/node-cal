#!/usr/bin/env node --harmony_destructuring

"use strict";
const zellers = require('./lib/zeller.js');
const createMonth = require('./lib/month.js');
const processArgs = require('./lib/processArgs.js');
const justYear = require('./lib/year.js');

const [ , , ...args] = process.argv;

if (args.length === 2) {
  try{
    var month = processArgs.checkMonth(args[0]);
    var year = processArgs.checkYear(parseInt(args[1]));
  } catch (e) {
    console.log(e);
    process.exit(64);
  }

  console.log(`${createMonth.joinOutput(year, month)}`);

} else if (args.length === 1) {
  try{
    var year = processArgs.checkYear(parseInt(args[0]));
  } catch (e) {
    console.log(e);
    process.exit(64);
  }
  const fullCal = justYear.outputFullCal(year);

  console.log(fullCal);

} else if (args.length === 0) {
  let timeNow = new Date();
  let thisMonth = timeNow.getMonth()+1;
  let thisYear = timeNow.getFullYear();

  console.log(createMonth.joinOutput(thisYear, thisMonth));

} else {
  console.log("Syntax not supported: Please enter either a [Year], or a [Month] [Year]");
}


