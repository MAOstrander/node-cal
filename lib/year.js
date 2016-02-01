"use strict";
const createMonth = require('../lib/month.js');

function createYearHeader (y, os) {
  let output = `                             ${y}\n`
  if (os === 'darwin') {
    output += `\n`;
  }

  return output;
}

function weekdayColumns (os) {
  let part = createMonth.printDayColumns(os);
  var spacing = '';
  if (os === 'darwin') {
    part = part.replace(/\s*$/,"");
    spacing = '  ';
  }

  const output = `${part}${spacing}${part}${spacing}${part}\n`

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

function outputFullCal (y, os) {
  let output = createYearHeader(y, os);
  let month1, month2, month3;
  var iterator = 0;

  for (var row = 1; row < 11; row +=3) {
    month1 = padMonth( createMonth.createWeeks(y, row) );
    month2 = padMonth( createMonth.createWeeks(y, row+1) );
    month3 = padMonth( createMonth.createWeeks(y, row+2) );


    output += monthRows(row);
    output += weekdayColumns(os);

    for (var k = 0; k < 6; k++) {
      iterator +=1;
      var endPart = month3[k].join(' ');
      var extraSpace;
      if (os === 'darwin') {
        endPart = endPart.replace(/\s*$/,"");
        extraSpace = ``;
      } else {
        extraSpace = `  `;
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
