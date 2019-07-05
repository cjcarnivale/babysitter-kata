/* The babysitter 
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)
*/

/*
Assumptions: 
1. a.m. and p.m. are unnecceary for the arguments because there is no overlap. Therefore, anything before 5:00
  for the start time and anything after 4:00 for the end time should throw an error.

*/

'use strict'; 

const hourCalculator = require('../index'); 
const { expect } = require('chai'); 

describe('Hour Calculator', () => {
  it('should throw an error if all arguments aren\'t present', () => {
    expect(() => hourCalculator('5:00 p.m.', '9:00 p.m.')).to.throw('Must enter start time, end time, and bed time');   
  });

  it('should throw an error if start time is earlier than 5:00 p.m.', () => {
    expect(() => hourCalculator('4:00 p.m.', '10:00 p.m.', '9:00 p.m.')).to.throw('Start time must be 5:00 p.m. or later');
  });
});