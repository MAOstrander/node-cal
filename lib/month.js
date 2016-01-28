"use strict";

const leap = require('../lib/isLeap.js');
const zellers = require('../lib/zeller.js');

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
function createMonthHeader (year, month) {
  switch (month) {
    case 3:
        return `     March ${year}\n`;
        break;
    case 4:
        return `     April ${year}\n`;
        break;
    case 5:
        return `      May ${year}\n`;
        break;
    case 6:
        return `      June ${year}\n`;
        break;
    case 7:
        return `      July ${year}\n`;
        break;
    case 8:
        return `    August ${year}\n`;
        break;
    case 9:
        return `   September ${year}\n`;
        break;
    case 10:
        return `    October ${year}\n`;
        break;
    case 11:
        return `    November ${year}\n`;
        break;
    case 12:
        return `    December ${year}\n`;
        break;
    case 1:
        return `    January ${year}\n`;
        break;
    case 2:
        return `    February ${year}\n`;
        break;
    default:
        return "Error";
  }
}

//Day columns are always 20 characters wide
function printDayColumns () {
  return `Su Mo Tu We Th Fr Sa\n`;
}

function printWeeks (year, month) {
  const days = howManyDays(year, month);
  const startDay = zellers.getDay(year, month, 1);
  const numweeks = weeks(year, month);
  let calBody = '';
  let arraysForDays = [];
  var i = 0;

  for (i = 0; i < days; i++) {
    if (i < 9) {
      arraysForDays[i] = ` ${i+1}`;
    } else {
      arraysForDays[i] = `${i+1}`;
    }
  }

  for (i = 0; i < startDay; i++) {
    arraysForDays.unshift('  ');
  }

  for (i = 0; i < numweeks; i++) {
    for (var j=0; j<7; j++) {
      if (arraysForDays.length > 0) {
        calBody += `${arraysForDays.shift()}`;
      }
        if (j<6 && arraysForDays.length > 0) {
          calBody += ` `;
        }
    }

    if (arraysForDays.length > 0) {
      calBody += `\n`;
    }
  }

  return calBody;
 }

function joinOutput (year, month, day) {
  let output = createMonthHeader(year, month);
  output += printDayColumns();
  output += printWeeks(year, month);

  return output;
}


module.exports = {
  createMonthHeader: createMonthHeader,
  printDayColumns: printDayColumns,
  joinOutput: joinOutput,
  weeks: weeks,
  howManyDays: howManyDays
  }
