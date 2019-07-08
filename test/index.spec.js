'use strict';

const hourCalculator = require('../index');
const { expect } = require('chai');

describe('Hour Calculator', () => {
  it('should throw an error if all arguments aren\'t present', () => {
    expect(() => hourCalculator('5:00 p.m.', '9:00 p.m.')).to.throw(
      'Must enter start time, end time, and bed time'
    );
  });

  it('should throw an error if start time is earlier than 5:00 p.m.', () => {
    expect(() =>
      hourCalculator('4:59 p.m.', '10:00 p.m.', '9:00 p.m.')
    ).to.throw('Start time must be 5:00 p.m. or later');
    expect(() =>
      hourCalculator('5:00 a.m.', '10:00 p.m.', '9:00 p.m.')
    ).to.throw('Start time must be 5:00 p.m. or later');
  });

  it('should throw an error if end time is later than 4:00 a.m.', () => {
    expect(() =>
      hourCalculator('6:00 p.m.', '4:59 a.m.', '9:00 p.m.')
    ).to.throw('End time must be 4:00 a.m. or earlier');
    expect(() =>
      hourCalculator('6:00 p.m.', '1:00 p.m.', '9:00 p.m.')
    ).to.throw('End time must be 4:00 a.m. or earlier');
  });

  it('should throw an error if the start time is later than end time', () => {
    expect(() =>
      hourCalculator('1:00 a.m.', '10:00 p.m.', '9:00 p.m.')
    ).to.throw('Start time must be before end time');
    expect(() =>
      hourCalculator('10:00 p.m.', '8:45 p.m.', '9:00 p.m.')
    ).to.throw('Start time must be before end time');
    expect(() =>
      hourCalculator('2:00 a.m.', '1:00 a.m.', '9:00 p.m.')
    ).to.throw('Start time must be before end time');
  });

  it('should throw an error if start time or end time are invalid', () => {
    expect(() =>
      hourCalculator('14:00 p.m.', '9:00 p.m.', '9:00 p.m.')
    ).to.throw('Start time, end time, and bed time must be valid times');
    expect(() =>
      hourCalculator('9:00 p.m.', '23:00 p.m.', '9:00 p.m.')
    ).to.throw('Start time, end time, and bed time must be valid times');
    expect(() =>
      hourCalculator('9:00 p.m.', '10:00 p.m.', '21:00 p.m.')
    ).to.throw('Start time, end time, and bed time must be valid times');
  });

  it('should throw an error if bed time is after midnight', () => {
    expect(() =>
      hourCalculator('5:00 p.m.', '4:00 a.m.', '1:00 a.m.')
    ).to.throw('Bed time must be before midnight');
  });

  it('should return the correct amount for a complete night of work', () => {
    expect(hourCalculator('5:59 p.m.', '3:01 a.m.', '9:59 p.m.')).to.equal(140);
  });
});

describe('Before Bed Pay', () => {
  it('should return the correct amount between start time and bed time', () => {
    expect(hourCalculator('9:00 p.m.', '10:00 p.m.', '8:00 p.m.')).to.equal(8);
    expect(hourCalculator('5:00 p.m.', '8:00 p.m.', '9:00 p.m.')).to.equal(36);
    expect(hourCalculator('5:00 p.m.', '10:00 p.m.', '9:00 p.m.')).to.equal(56);
  });
});

describe('Bed Pay', () => {
  it('should return the correct amount between bed time and midnight', () => {
    expect(hourCalculator('12:00 a.m.', '3:00 a.m.', '9:00 p.m.')).to.equal(48);
    expect(hourCalculator('10:00 p.m.', '11:00 p.m.', '9:00 p.m.')).to.equal(8);
    expect(hourCalculator('6:00 p.m.', '11:00 p.m.', '9:00 p.m.')).to.equal(52);
    expect(hourCalculator('10:00 p.m.', '1:00 a.m.', '9:00 p.m.')).to.equal(32);
    expect(hourCalculator('6:00 p.m.', '1:00 a.m.', '9:00 p.m.')).to.equal(76);
  });
});

describe('After Midnight Pay', () => {
  it('should return the correct amount after midnight', () => {
    expect(hourCalculator('5:00 p.m.', '11:00 p.m.', '9:00 p.m.')).to.equal(64);
    expect(hourCalculator('1:00 a.m.', '3:00 a.m.', '11:00 p.m.')).to.equal(32);
    expect(hourCalculator('9:00 p.m.', '4:00 a.m.', '9:00 p.m.')).to.equal(88);
  });
});
