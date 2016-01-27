"use strict";

function createMonthHeader (year, month) {
  switch (month) {
    case 3:
        return `          March ${year}\n`;
        break;
    case 4:
        return `          April ${year}\n`;
        break;
    case 5:
        return `          May ${year}\n`;
        break;
    case 6:
        return `          June ${year}\n`;
        break;
    case 7:
        return `          July ${year}\n`;
        break;
    case 8:
        return `          August ${year}\n`;
        break;
    case 9:
        return `          September ${year}\n`;
        break;
    case 10:
        return `          October ${year}\n`;
        break;
    case 11:
        return `          November ${year}\n`;
        break;
    case 12:
        return `          December ${year}\n`;
        break;
    case 13:
        return `          January ${year}\n`;
        break;
    case 14:
        return `          February ${year}\n`;
        break;
    default:
        return "Error";
  }
}

console.log(createMonthHeader(2016, 14));

module.exports = {
  createMonthHeader: createMonthHeader
}
