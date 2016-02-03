"use strict";

const leap = require('../lib/isLeap.js');
const zellers = require('../lib/zeller.js');
const _ = require('lodash');

function howManyDays (year, month) {
  const toLeap = leap.leapYear(year);
  let manyDays = 31;

  if (month === 4 ||
      month === 6 ||
      month === 9 ||
      month === 11) {
    manyDays = 30;
  } else if (month === 2) {
    if (toLeap) {
      manyDays = 29;
    } else {
      manyDays = 28;
    }
  }

  return manyDays;
}

function weeks (year, month) {
  const days = howManyDays(year, month);
  const startDay = zellers.getDay(year, month, 1);

  let numweeks = Math.ceil( (days + startDay) / 7);

  return numweeks;
}

//Spaces on left should be based on the ratio of half the month + year length to get 20 characters
//September = 9 + 1space + 2016 = 4 === 14, so 3 spaces needed to center it?
//function monthHeaderSpace (year, month, os) {
function createMonthHeader (year, month, os) {
  const allMonths = ['January', 'February', 'March', 'April', 'May', ' June', ' July', 'August', 'September', 'October', ' November', ' December'];
  let thisMonth = allMonths[month-1];

  var base = `${thisMonth} ${year}`;
  var lspace = Math.floor((20 - base.length) / 2);
  var rspace = Math.ceil((20 - base.length) / 2);
  var lspacer = ' '.repeat(lspace);
  var rspacer = ' '.repeat(rspace) + '  ';
  var monthHeader;
  if (os === 'darwin') {
    monthHeader = `${lspacer}${base}\n`;
  } else {
    monthHeader = `${lspacer}${base}${rspacer}\n`;
  }

  return monthHeader;
}

//Day columns are always 20 characters wide
function printDayColumns (os) {
  var extraSpace;
  if (os === 'darwin') {
    extraSpace = ``;
  } else {
    extraSpace = `  `;
  }

  return `Su Mo Tu We Th Fr Sa${extraSpace}`;
}

function rowPrint (rowsByWeeks, os) {
  let numweeks = rowsByWeeks.length
  let calBody = '';
  var extraSpace;
  if (os === 'darwin') {
    extraSpace = ``;
  } else {
    extraSpace = `  `;
  }


  for (var i = 0; i < numweeks; i++) {
    calBody += `${rowsByWeeks[i].join(' ')}${extraSpace}`;

    if (os === 'darwin') {
      calBody = calBody.replace(/\s*$/,"");
    }

    if (i < numweeks) {
      calBody += `\n`;
    }

    if (os !== 'darwin') {
      calBody += `\n`;
    }



  }

  return calBody;

}

function createWeeks (year, month, os) {
  const days = howManyDays(year, month);
  const startDay = zellers.getDay(year, month, 1);
  let arraysForDays = [];
  var i = 0;
  var d = new Date();
  var n = d.getDate();
  var m = d.getMonth();
  var bold;

  for (i = 0; i < days; i++) {
    if (os !== 'darwin' && (n === i+1) && (month === m+1)) {
      bold = `_\b _\b`;
    } else {
      bold = ``;
    }

    if (i < 9) {
      arraysForDays[i] = ` ${bold}${i+1}`;
    } else {
      arraysForDays[i] = `${bold}${i+1}`;
    }
  }

  for (i = 0; i < startDay; i++) {
    arraysForDays.unshift('  ');
  }

  var newIndex = arraysForDays.length;

  for (i = newIndex; i < 42; i++) {
    arraysForDays.push('  ');
  }

  return _.chunk(arraysForDays, 7);
}

function joinOutput (year, month, os) {
  let theMonth = createWeeks(year, month, os);
  let part = printDayColumns(os);
  let output = createMonthHeader(year, month, os);
  output += `${part}\n`;
  output += rowPrint(theMonth, os);
//  console.log(monthHeaderSpace(year, month, os));
  return output;
}


module.exports = {
  createWeeks: createWeeks,
  createMonthHeader: createMonthHeader,
  printDayColumns: printDayColumns,
  joinOutput: joinOutput,
  weeks: weeks,
  howManyDays: howManyDays,
  rowPrint: rowPrint
  }
