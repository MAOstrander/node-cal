#!/usr/bin/env node --harmony_destructuring

"use strict";
const zellers = require('./lib/zeller.js');
const createMonth = require('./lib/month.js');

const [ , , ...args] = process.argv;

if (args.length === 2) {
  const month = parseInt(args[0]);
  const year = parseInt(args[1]);

  console.log(`${createMonth.joinOutput(year, month)}`);
} else if (args.length === 1) {
  const year = parseInt(args[0]);

  console.log(`generateYear(${year})`);
} else {
  let timeNow = new Date();
  let thisMonth = timeNow.getMonth()+1;
  let thisYear = timeNow.getFullYear();

  console.log(createMonth.joinOutput(thisYear, thisMonth));
}


