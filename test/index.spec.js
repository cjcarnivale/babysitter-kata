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
1.  If babysitter starts 1 minute or greater into a new hour, they get credit for the whole hour. 
2.  Bed time gets rounded to the next whole hour.
*/

'use strict'; 

const hourCalculator = require('../index'); 
const { expect } = require('chai'); 

describe('Hour Calculator', () => {
  it('should throw an error if all arguments aren\'t present', () => {
    expect(() => hourCalculator('5:00 p.m.', '9:00 p.m.')).to.throw('Must enter start time, end time, and bed time');   
  });

  it('should throw an error if start time is earlier than 5:00 p.m.', () => {
    expect(() => hourCalculator('4:59 p.m.', '10:00 p.m.', '9:00 p.m.')).to.throw('Start time must be 5:00 p.m. or later');
    expect(() => hourCalculator('5:00 a.m.', '10:00 p.m.', '9:00 p.m.')).to.throw('Start time must be 5:00 p.m. or later'); 
  });

  it('should throw an error if end time is later than 4:00 a.m.', () => {
    expect(() => hourCalculator('6:00 p.m.', '4:59 a.m.', '9:00 p.m.')).to.throw('End time must be 4:00 a.m. or earlier'); 
    expect(() => hourCalculator('6:00 p.m.', '1:00 p.m.', '9:00 p.m.')).to.throw('End time must be 4:00 a.m. or earlier');
  }); 

  it('should throw an error if the start time is later than end time', () => {
    expect(() => hourCalculator('10:00 p.m.', '8:45 p.m.', '9:00 p.m.')).to.throw('Start time must be before end time');
    expect(() => hourCalculator('1:00 a.m.', '10:00 p.m.', '9:00 p.m.')).to.throw('Start time must be before end time'); 
  });

  it('should throw an error if start time or end time are invalid', () => {
    expect(() => hourCalculator('14:00 p.m.', '9:00 p.m.', '9:00 p.m.')).to.throw('Start time, end time, and bed time must be valid times');
    expect(() => hourCalculator('9:00 p.m.', '23:00 p.m.', '9:00 p.m.')).to.throw('Start time, end time, and bed time must be valid times');
    expect(() => hourCalculator('9:00 p.m.', '10:00 p.m.', '21:00 p.m.')).to.throw('Start time, end time, and bed time must be valid times');
  });

  it('should throw an error if bed time is after midnight', () => {
    expect(() => hourCalculator('5:00 p.m.', '4:00 a.m.', '1:00 a.m.')).to.throw('Bed time must be before midnight'); 
  });


});