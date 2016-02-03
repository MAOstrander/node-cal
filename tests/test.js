"use strict";
const { expect } = require('chai');
const { execSync } = require('child_process');
const zellers = require('../lib/zeller.js');
const createMonth = require('../lib/month.js');
const leap = require('../lib/isLeap.js');
const justYear = require('../lib/year.js');
const para = require('../lib/processArgs.js');

describe('cal', () => {
  describe('CLI', () => {
   it('should display the current month', () => {
      const goal = execSync('cal').toString();
      const ourOutput = execSync('./cal.js').toString();

      expect(ourOutput).to.equal(goal);
    });
  });

  describe("Zeller's congruence", () => {
    describe('.modified_month', () => {

      //2012, 1 === 13
      it('return 13 for January', () => {
        const mod = zellers.modifiedMonth(2012, 1);

        expect(mod).to.equal(13);
      })

      //2012, 2 === 14
      it('return 14 for February', () => {
        const mod = zellers.modifiedMonth(2012, 2);

        expect(mod).to.equal(14);
      })

      //2012, 3 === 3
      it('return 3 for March', () => {
        const mod = zellers.modifiedMonth(2012, 3);

        expect(mod).to.equal(3);
      })
    });

    describe('.modifiedYear', () => {
      it('returns 2014 for Jan 2015', () => {
        expect(zellers.modifiedYear(2015, 1)).to.equal(2014);
      });

      // 2016, 2 === 2015
      it('returns 2015 for Feb 2016', () => {
        expect(zellers.modifiedYear(2016, 2)).to.equal(2015);
      });

      // 2017, 3 === 2017
      it('returns 2017 for March 2017', () => {
        expect(zellers.modifiedYear(2017, 3)).to.equal(2017);
      });
    });


    describe('.getDay', () => {
      it('returns 2 (Tuesday) for March 1, 2016', () => {
        expect(zellers.getDay(2016, 3, 1)).to.equal(2);
      });

      // 2000, 3, 1 === 3
      it('returns 3 (Wednesday) for March 1, 2000', () => {
        expect(zellers.getDay(2000, 3, 1)).to.equal(3);
      });

      // 2100, 3, 1 === 1
      it('returns 1 (Monday) for March 1, 2100', () => {
        expect(zellers.getDay(2100, 3, 1)).to.equal(1);
      });

      // 2200, 3, 2 === 0
      it('returns 0 (Sunday) for March 2, 2200', () => {
        expect(zellers.getDay(2200, 3, 2)).to.equal(0);
      });

      // 2300, 3, 1 === 4
      it('returns 4 (Thursday) for March 1, 2300', () => {
        expect(zellers.getDay(2300, 3, 1)).to.equal(4);
      });

      // 2300, 3, 1 === 4
      it('returns 6 (Saturday) for November 7, 2015', () => {
        expect(zellers.getDay(2015, 11, 7)).to.equal(6);
      });
    });

  });

//  describe('centering the month', () => {
//    it("should handle January", () => {
//      expect(center('January 2016')).to.equal('    January 2016');
//    });
//    it("should handle February", () => {
//      expect(center('February 2016')).to.equal('   February 2016');
//    });
//  });

  describe('is the given year a leap year?', () => {
    it("if it isn't a possible leap year (not divisible by 4), return false", () => {
      expect(leap.leapYear(1999)).to.be.false;
    });

    it("if it is a leap year, return true", () => {
      expect(leap.leapYear(2004)).to.be.true;
    });

    it("if it is a leap year, but divisible by 100 and not 400, return false", () => {
      expect(leap.leapYear(1900)).to.be.false;
    });

    it("if it is a leap year, but divisible by 100 and 400, return true", () => {
      expect(leap.leapYear(1600)).to.be.true;
    });

  });

  describe('How many days are in a given month?', () => {
    //30 day month (11/2015)
    it("if the month has 30 days, func should return 30", () => {
      expect(createMonth.howManyDays(2015, 11)).to.equal(30);
    });
    //31 day month (12/2015)
    it("if the month has 31 days, func should return 31", () => {
      expect(createMonth.howManyDays(2015, 12)).to.equal(31);
    });

    //29 day month (leap year) 2/2012
    it("if it is a leap year and feb, func should return 29", () => {
      expect(createMonth.howManyDays(2012, 2)).to.equal(29);
    });

    //28 day month (feb non leap year) 2/2014
    it("if it is feb and not a leap year, func should return 28", () => {
      expect(createMonth.howManyDays(2014, 2)).to.equal(28);
    });
  });

  describe('How many weeks are in a given month?', () => {
    //6 week month (8/2015)
    it("if the month has 6 weeks, func should return 6", () => {
      expect(createMonth.weeks(2015, 8)).to.equal(6);
    });
    //5 week month (10/2015)
    it("if the month has 5 weeks, func should return 5", () => {
      expect(createMonth.weeks(2015, 10)).to.equal(5);
    });

    //4 week month (2/2015)
    it("if the month is february and begins on a sunday, (4 weeks) func should return 4", () => {
      expect(createMonth.weeks(2015, 2)).to.equal(4);
    });
  });

  describe('Create an array of all the days in the month', () => {
    it("It should be an array of weeks, length = 6", () => {
      const os = 'darwin';
      expect(createMonth.createWeeks(2000, 10, os).length).to.equal(6);
    });

    it("Take each smaller function to build a calendar line by line", () => {
      const goal = `     April 1999\nSu Mo Tu We Th Fr Sa\n             1  2  3\n 4  5  6  7  8  9 10\n11 12 13 14 15 16 17\n18 19 20 21 22 23 24\n25 26 27 28 29 30\n`;
      const os = 'darwin';
      expect(createMonth.joinOutput(1999, 2, os)).to.be.a('string');
      expect(createMonth.joinOutput(1999, 4, os)).to.equal(goal);
    });

  });

  describe('Make sure that the month header returns the appropriate month', () => {
    it('should give me January if 1 is passed as the month', () => {
      const goal = `    January 2016\n`;
      const ourOutput = createMonth.createMonthHeader(2016, 1, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give February if 2 is passed as the month', () => {
      const goal = `   February 2016\n`;
      const ourOutput = createMonth.createMonthHeader(2016, 2, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give me March if 3 is passed as the month', () => {
      const goal = `     March 2015\n`;
      const ourOutput = createMonth.createMonthHeader(2015, 3, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give April if 4 is passed as the month', () => {
      const goal = `     April 2015\n`;
      const ourOutput = createMonth.createMonthHeader(2015, 4, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give May if 5 is passed as the month', () => {
      const goal = `      May 2014\n`;
      const ourOutput = createMonth.createMonthHeader(2014, 5, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give June if 6 is passed as the month', () => {
      const goal = `      June 2014\n`;
      const ourOutput = createMonth.createMonthHeader(2014, 6, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give July if 7 is passed as the month', () => {
      const goal = `      July 2013\n`;
      const ourOutput = createMonth.createMonthHeader(2013, 7, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give August if 8 is passed as the month', () => {
      const goal = `    August 2013\n`;
      const ourOutput = createMonth.createMonthHeader(2013, 8, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give September if 9 is passed as the month', () => {
      const goal = `   September 2014\n`;
      const ourOutput = createMonth.createMonthHeader(2014, 9, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give October if 10 is passed as the month', () => {
      const goal = `    October 2014\n`;
      const ourOutput = createMonth.createMonthHeader(2014, 10, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give November 11 is passed as the month', () => {
      const goal = `    November 2013\n`;
      const ourOutput = createMonth.createMonthHeader(2013, 11, 'darwin');
      expect(ourOutput).to.equal(goal);
    });
    it('should give December 12 is passed as the month', () => {
      const goal = `    December 2013\n`;
      const ourOutput = createMonth.createMonthHeader(2013, 12, 'darwin');
      expect(ourOutput).to.equal(goal);
    });


  describe('Printing the days of the weeks at the top of each month', () => {
    it('should print the days from Sunday to Saturday', () => {
      const goal = `Su Mo Tu We Th Fr Sa`;
      const os = 'darwin';
      const ourOutput = createMonth.printDayColumns(os);
      expect(ourOutput).to.equal(goal);
    });

    it('The days should be 20 characters in length', () => {
      const os = 'darwin';
      expect(createMonth.printDayColumns(os).length).to.equal(20);
    });
    it('Sunday should be the first day of the week', () => {
      const os = 'darwin';
      expect(createMonth.printDayColumns(os).slice(0,2)).to.equal("Su");
    });
  });

  });


  describe('Full year function', () => {

    it('if a year is entered it should display the chosen year', () => {
      const goal = execSync('cal 2016').toString();
      const ourOutput = execSync('./cal.js 2016').toString();

      expect(ourOutput).to.equal(goal);
    });

    it('The output function should return the calendar as a string', () => {
      const output = justYear.outputFullCal(1888);
      expect(output).to.be.a('string');
    });
    it('The output function of the should match predicted calendar', () => {
      const os = 'darwin';
      const goal = `                             1800\n\
\n      January               February               March\
\nSu Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa\
\n          1  2  3  4                     1                     1\
\n 5  6  7  8  9 10 11   2  3  4  5  6  7  8   2  3  4  5  6  7  8\
\n12 13 14 15 16 17 18   9 10 11 12 13 14 15   9 10 11 12 13 14 15\
\n19 20 21 22 23 24 25  16 17 18 19 20 21 22  16 17 18 19 20 21 22\
\n26 27 28 29 30 31     23 24 25 26 27 28     23 24 25 26 27 28 29\
\n                                            30 31\
\n       April                  May                   June\
\nSu Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa\
\n       1  2  3  4  5               1  2  3   1  2  3  4  5  6  7\
\n 6  7  8  9 10 11 12   4  5  6  7  8  9 10   8  9 10 11 12 13 14\
\n13 14 15 16 17 18 19  11 12 13 14 15 16 17  15 16 17 18 19 20 21\
\n20 21 22 23 24 25 26  18 19 20 21 22 23 24  22 23 24 25 26 27 28\
\n27 28 29 30           25 26 27 28 29 30 31  29 30\
\n                                            \
\n        July                 August              September\
\nSu Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa\
\n       1  2  3  4  5                  1  2      1  2  3  4  5  6\
\n 6  7  8  9 10 11 12   3  4  5  6  7  8  9   7  8  9 10 11 12 13\
\n13 14 15 16 17 18 19  10 11 12 13 14 15 16  14 15 16 17 18 19 20\
\n20 21 22 23 24 25 26  17 18 19 20 21 22 23  21 22 23 24 25 26 27\
\n27 28 29 30 31        24 25 26 27 28 29 30  28 29 30\
\n                      31                    \
\n      October               November              December\
\nSu Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa\
\n          1  2  3  4                     1      1  2  3  4  5  6\
\n 5  6  7  8  9 10 11   2  3  4  5  6  7  8   7  8  9 10 11 12 13\
\n12 13 14 15 16 17 18   9 10 11 12 13 14 15  14 15 16 17 18 19 20\
\n19 20 21 22 23 24 25  16 17 18 19 20 21 22  21 22 23 24 25 26 27\
\n26 27 28 29 30 31     23 24 25 26 27 28 29  28 29 30 31\
\n                      30                    `;
      const output = justYear.outputFullCal(1800, os);
      expect(output).to.equal(goal);
    });


    it('if 2016 is entered it should create a 2016 header and a line of space', () => {
      const goal = `                             2016\n\n`;
      const os = 'darwin';
      expect(justYear.createYearHeader(2016, os)).to.equal(goal);
    });

    it('Should have the days of the week for three months generated on a single line', () => {
      const goal = `Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa\n`;
      const os = 'darwin';
      expect(justYear.weekdayColumns(os)).to.equal(goal);
    });

    describe('Picking the correct headers per row', () => {
      let os = 'darwin';
      it('should display January, February, and March in a single line', () => {
        const goal = `      January               February               March\n`;
        expect(justYear.monthRows(1, os)).to.equal(goal);
      });
      it('should display April, May, June in a single line', () => {
        const goal = `       April                  May                   June\n`;
        expect(justYear.monthRows(4, os)).to.equal(goal);
      });
      it('should display July, August, September in a single line', () => {
        const goal = `        July                 August              September\n`;
        expect(justYear.monthRows(7, os)).to.equal(goal);
      });
      it('should display October, November, December in a single line', () => {
        const goal = `      October               November              December\n`;
        expect(justYear.monthRows(10, os)).to.equal(goal);
      });
      it('should give an error if an incorrect row is passed in', () => {
        const goal = `something went wrong`;
        expect(justYear.monthRows(3), 'darwin').to.equal(goal);
      });
    });

    describe('Add padding to rows to allow each month to be equal sized', () => {
      const os = 'darwin';
      it("It should be an array of 6 weeks if it started with 4 weeks", () => {
        expect(justYear.padMonth( createMonth.createWeeks(2015, 2, os) ).length).to.equal(6);
      });
      it("It should be an array of 6 weeks if it started with 6 weeks", () => {
        expect(justYear.padMonth( createMonth.createWeeks(1753, 9, os) ).length).to.equal(6);
      });
    });
  });

  describe('Make sure only proper variables are passed in', () => {
      it("if the year is between 1753 and 9999, return the same year", () => {
        expect(para.checkYear(2016)).to.equal(2016);
      });
      it("should only accept a year that is between 1753 and 9999", () => {
        expect(para.checkYear.bind(para, 1752)).to.throw("Please enter a year between 1753 and 9999");
        expect(para.checkYear.bind(para, 100000)).to.throw("Please enter a year between 1753 and 9999");
      });
      describe('check month', () => {
        it("if the month entered is between 1 and 12, return an integer of that month", () => {
          expect(para.checkMonth('1')).to.equal(1);
          expect(para.checkMonth('1')).to.be.a('number');
        });
        it("should only accept a month that is between 1 and 12", () => {
          expect(para.checkMonth.bind(para, '1752')).to.throw("Please enter a month between 1 and 12");
          expect(para.checkMonth.bind(para, '100000')).to.throw("Please enter a month between 1 and 12");
          expect(para.checkMonth.bind(para, 'asdf')).to.throw("Please enter a month between 1 and 12");
        });

        it("if jan (or Jan or January) is typed in return 1 for the month", () => {
          expect(para.checkMonth('jan')).to.equal(1);
          expect(para.checkMonth('jan')).to.be.a('number');
        });
        it("if feb is typed in, return 2 for the month", () => {
          expect(para.checkMonth('feb')).to.equal(2);
          expect(para.checkMonth('feb')).to.be.a('number');
        });
        it("if mar is typed in, return 3 for the month", () => {
          expect(para.checkMonth('mar')).to.equal(3);
          expect(para.checkMonth('mar')).to.be.a('number');
        });
        it("if apr is typed in, return 4 for the month", () => {
          expect(para.checkMonth('apr')).to.equal(4);
          expect(para.checkMonth('apr')).to.be.a('number');
        });
        it("if may is typed in, return 5 for the month", () => {
          expect(para.checkMonth('may')).to.equal(5);
          expect(para.checkMonth('may')).to.be.a('number');
        });
        it("if jun is typed in, return 6 for the month", () => {
          expect(para.checkMonth('jun')).to.equal(6);
          expect(para.checkMonth('jun')).to.be.a('number');
        });
        it("if jul is typed in, return 7 for the month", () => {
          expect(para.checkMonth('jul')).to.equal(7);
          expect(para.checkMonth('jul')).to.be.a('number');
        });
        it("if aug is typed in, return 8 for the month", () => {
          expect(para.checkMonth('aug')).to.equal(8);
          expect(para.checkMonth('aug')).to.be.a('number');
        });
        it("if sep is typed in, return 9 for the month", () => {
          expect(para.checkMonth('sep')).to.equal(9);
          expect(para.checkMonth('sep')).to.be.a('number');
        });
        it("if oct is typed in, return 10 for the month", () => {
          expect(para.checkMonth('oct')).to.equal(10);
          expect(para.checkMonth('oct')).to.be.a('number');
        });
        it("if nov is typed in, return 11 for the month", () => {
          expect(para.checkMonth('nov')).to.equal(11);
          expect(para.checkMonth('nov')).to.be.a('number');
        });
        it("if dec is typed in, return 12 for the month", () => {
          expect(para.checkMonth('dec')).to.equal(12);
          expect(para.checkMonth('dec')).to.be.a('number');
        });
      });

  });
});

