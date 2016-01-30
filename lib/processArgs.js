"use strict";

function checkYear (y) {
  if (1752 < y && y < 10000) {
    return y;
  } else {
    throw new RangeError ("Please enter a year between 1753 and 9999");
  }
}

function checkMonth (m) {

  let mstring = m.slice(0,3).toLowerCase();

  switch (mstring) {
    case 'jan':
        m = 1;
        break;
    case 'feb':
        m = 2;
      break;
    case 'mar':
        m = 3;
        break;
    case 'apr':
        m = 4;
        break;
    case 'may':
        m = 5;
        break;
    case 'jun':
        m = 6;
        break;
    case 'jul':
        m = 7;
        break;
    case 'aug':
        m = 8;
        break;
    case 'sep':
        m = 9;
        break;
    case 'oct':
        m = 10;
        break;
    case 'nov':
        m = 11;
        break;
    case 'dec':
        m = 12;
        break;
  }



  m = parseInt(m);
  if (0 < m  && m < 13) {
    return m;
  } else {
    throw new RangeError ("Please enter a month between 1 and 12");
  }
}

module.exports = {
  checkYear: checkYear,
  checkMonth: checkMonth
}
