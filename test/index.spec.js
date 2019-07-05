/* The babysitter 
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)
*/

'use strict'; 

const hourCalculator = require('../index'); 
const { expect } = require('chai'); 

describe('Hour Calculator', () => {
  it('should throw an error if all arguments aren\'t present', () => {
    expect(() => hourCalculator('5:00', '9:00')).to.throw('Must enter start time, end time, and bed time');   
  });
});