"use strict";
/* eslint no-magic-numbers: 0 */

function leapYear (y) {
  // If it isn't divisible by four, it isn't a leap year
  if (y % 4 === 0) {
    // if it is divisible by four and not divisible by 100 the it is a leap year
    if (y % 100 === 0) {
      // if it is divisible by 4 and 100 it isn't a leap year, unless it's divisible by 400
      if(y % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }

}

module.exports = {
  leapYear: leapYear
}
