"use strict";

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
    case 13:
        return `    January ${year}\n`;
        break;
    case 14:
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

function printWeeks (modDay, manyDays) {
  // ` 1  2  3  4  5  6  7/n`
  // ` 8  9 10 11 12 13 14\n
  // `${} ${} ${} ${} ${} ${} ${}\n
  //
  // Create an array [1...manyDays]
  // fill it in the template starting at modDay = 1 or array[0]
  // print seven days in each line till we reach end of array

 }

 function daysInMonth (year, month) {
  let manyDays = 31;
  if (month === 4 ||
      month === 6 ||
      month === 9 ||
      month === 11) {
    manyDays = 30;
  } else if (month === 14) {
    if (year % 4 === 0) {
      manyDays = 29;
      if (year % 100 === 0) {
        manyDays = 28;
        if(year % 400 === 0) {
          manyDays = 29;
        }
      }
    } else {
      manyDays = 28;
    }
  }
  return manyDays;
}

function joinOutput (year, month, day) {
  let output = createMonthHeader(year, month);
  output += printDayColumns();

  return output;
}

console.log(joinOutput(2016, 5, 26));

module.exports = {
  createMonthHeader: createMonthHeader,
  printDayColumns: printDayColumns,
  joinOutput: joinOutput,
  daysInMonth: daysInMonth
}
