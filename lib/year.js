"use strict";
const createMonth = require('../lib/month.js');

function createYearHeader (y) {
  let output = `                             ${y}\n`
  if (process.platform === 'darwin') {
    output += `\n`;
  }

  return output;
}

function weekdayColumns () {
  const part = createMonth.printDayColumns();
  const output = `${part}  ${part}  ${part}\n`

  return output;
}

function padMonth(shortM) {
  const endWeek = shortM.length-1;
  const endPad = shortM[endWeek].length;
  const superPad = ['  ', '  ', '  ', '  ', '  ', '  ', '  ']

  for (var i = endPad; i < 7; i++) {
    shortM[endWeek].push('  ')
  }

  if (shortM.length < 6) {
    shortM.push(superPad);
  }
  if (shortM.length < 6) {
    shortM.push(superPad);
  }


  return shortM;
}

function monthRows(row) {
  if (row === 1) {
    return `      January               February               March\n`;
  } else if (row === 4) {
    return `       April                  May                   June\n`;
  } else if (row === 7) {
    return `        July                 August              September\n`;
  } else if (row === 10) {
    return `      October               November              December\n`;
  } else {
    return 'something went wrong';
  }
}

function outputFullCal (y) {
  let output = createYearHeader(y);
  let month1, month2, month3;
  var iterator = 0;

  for (var row = 1; row < 11; row +=3) {
    month1 = padMonth( createMonth.createWeeks(y, row) );
    month2 = padMonth( createMonth.createWeeks(y, row+1) );
    month3 = padMonth( createMonth.createWeeks(y, row+2) );


    output += monthRows(row);
    output += weekdayColumns();

    for (var k = 0; k < 6; k++) {
      iterator +=1;
      var endPart = month3[k].join(' ');
      var extraSpace = `  `;
      if (process.platform === 'darwin') {
        endPart = endPart.replace(/\s*$/,"");
        extraSpace = ``;
      }


      output += `${month1[k].join(' ')}  ${month2[k].join(' ')}  ${endPart}${extraSpace}`;
      if (iterator < 24) {
        output += `\n`;
      }
    }
  }
  return output
}

module.exports = {
  createYearHeader: createYearHeader,
  monthRows: monthRows,
  padMonth: padMonth,
  outputFullCal: outputFullCal,
  weekdayColumns: weekdayColumns
}
