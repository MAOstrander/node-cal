"use strict";
const { expect } = require('chai');
const { execSync } = require('child_process');

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
        const mod = zellars.modifiedMonth(2012, 01);

        expect(mod).to.equal(13);
      })

      //2012, 2 === 14
      it('return 14 for February', () => {
        const mod = zellars.modifiedMonth(2012, 02);

        expect(mod).to.equal(14);
      })

      //2012, 3 === 3
      it('return 3 for March', () => {
        const mod = zellars.modifiedMonth(2012, 03);

        expect(mod).to.equal(3);
      })


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

});

