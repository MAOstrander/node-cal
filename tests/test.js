"use strict";
const { expect } = require('chai');
const { execSync } = require('child_process');

describe('cal', () => {
  it('should display the current month', () => {
    const goal = execSync('cal').toString();
    const ourOutput = execSync('./cal.js').toString();

    expect(ourOutput).to.equal(goal);
  });
});
