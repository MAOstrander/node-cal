"use strict";
const { expect } = require('chai');
const { execSync } = require('child_process');
const zellers = require('../lib/zeller.js');
const createMonth = require('../lib/month.js');
const leap = require('../lib/isLeap.js');

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
    //.modifiedYear
    //2000, 1 = 1999
    //2012, 2 = 2011
    //2013, 3 = 2013
    //
    //.calculate
    //2014, 3, 2 === 1
    //2012, 1, 1 === 1
    //2012, 1, 12 === 5
    //1799, 2, 1 === 6
    //2000, 11, 1 === 4
  });

  describe('centering the month', () => {
    it("should handle January", () => {
 //     expect(center('January 2016')).to.equal('    January 2016');
    });
    it("should handle February", () => {
   //   expect(center('February 2016')).to.equal('   February 2016');
    });
  });

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
});
//6 week month (8/2015)
//5 week month (10/2015)
//4 week month (2/2015)
//30 day month (11/2015)
//31 day month (12/2015)
//29 day month (leap year) 2/2012
//28 day month (feb non leap year) 2/2014
