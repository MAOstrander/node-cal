"use strict";
/* eslint no-magic-numbers: 0 */

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
  const numweeks = Math.ceil( (days + startDay) / 7);

  return numweeks;
}

// Spaces on left should be based on the ratio of half the month + year length to get 20 characters
// September = 9 + 1space + 2016 = 4 === 14, so 3 spaces needed to center it?
// function monthHeaderSpace (year, month, os) {
function createMonthHeader (year, month, os) {
  const allMonths = ['January', 'February', 'March', 'April', 'May', ' June', ' July', 'August', 'September', 'October', ' November', ' December'];
  const thisMonth = allMonths[month - 1];
  const calendarWidth = 20;

  var base = `${thisMonth} ${year}`;
  var lspace = Math.floor((calendarWidth - base.length) / 2);
  var rspace = Math.ceil((calendarWidth - base.length) / 2);
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

// Day columns are always 20 characters wide
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
  const numweeks = rowsByWeeks.length;
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
      calBody = calBody.replace(/\s*$/,""); // eslint-disable-line comma-spacing
    }

    if (i < 5) {
      calBody += `\n`;
    }

    if (os === 'darwin' && i === 5) {
      calBody += `\n`;
    }

  }

  return calBody;

}

function highlightCurrentDay (year, month, os) {
  var d = new Date();
  var n = d.getDate().toString();
  var m = d.getMonth();
  m += 1;
  var y = d.getFullYear();
  var boldDate;

  if (os !== 'darwin') {
    if (year === y) {
      if (month === m) {
        if (n.length === 1) {
          boldDate = `_\b _\b${n}`;
          return boldDate;
        } else {
          var answer = n.split('');
          boldDate = `_\b${answer[0]}_\b${answer[1]}`;
          return boldDate;
        }

      }
    }
  }

}

function createWeeks (year, month, os) {
  const days = howManyDays(year, month);
  const startDay = zellers.getDay(year, month, 1);
  const arraysForDays = [];
  var i = 0;
  var d = new Date();
  var m = d.getMonth();
  var n = d.getDate();
  var boldDate = highlightCurrentDay(year, month, os);

  for (i = 0; i < days; i++) {
    if (i < 9) {
      arraysForDays[i] = ` ${i + 1}`;
    } else {
      arraysForDays[i] = `${i + 1}`;
    }

    if (boldDate && (n === i + 1) && (month === m + 1)) {
      arraysForDays[i] = boldDate;
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
  const theMonth = createWeeks(year, month, os);
  const part = printDayColumns(os);
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
  highlightCurrentDay: highlightCurrentDay,
  rowPrint: rowPrint
}
