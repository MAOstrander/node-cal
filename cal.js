#!/usr/bin/env node --harmony_destructuring

"use strict";
const zellers = require('./lib/zeller.js');
const createMonth = require('./lib/month.js');

const [ , , ...args] = process.argv;

if (args.length === 2) {
  const [month, year] = args;

  console.log(`generateMonth(${year}, ${month})`);
} else if (args.length === 1) {
  const [year] = args;

  console.log(`generateYear(${year})`);
} else {
  console.log('Hi from cal');
}


