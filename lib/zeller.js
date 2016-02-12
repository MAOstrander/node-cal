"use strict";
/* eslint no-magic-numbers: 0 */

// h is the day of the week
// q is the day of the month
// m is the month
// Y is the year

function modifiedMonth (year, month) {
  let modMonth = month;

  if (month === 1) {
    modMonth = 13;
  } else if (month === 2) {
    modMonth = 14;
  }

  return modMonth;
}

function modifiedYear (year, month) {
  let modYear = year;

  if (month === 1) {
    modYear = year - 1;
  } else if (month === 2) {
    modYear = year - 1;
  }

  return modYear;
}

function getDay (year, month, day) {
  const Y = modifiedYear(year, month);
  const m = modifiedMonth(year, month);
  const q = day;
  const h = (q + Math.floor( (m + 1) * 26 / 10 ) + Y + Math.floor(Y / 4) + 6 * Math.floor(Y / 100) + Math.floor(Y / 400)) % 7;
  let modDay = h - 1;
  if (modDay === -1) {
    modDay = 6;
  }
  return modDay;
}

module.exports = {
  modifiedMonth: modifiedMonth,
  modifiedYear: modifiedYear,
  getDay: getDay
}
