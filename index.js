'use strict';

module.exports = function hourCalculator(startTime, endTime, bedTime) {
  if (!startTime || !endTime || !bedTime) {
    throw new Error('Must enter start time, end time, and bed time');
  }

  let startHour = convertToMilitary(startTime);
  let endHour = convertEndTimeMinutes(endTime);
  let bedHour = convertEndTimeMinutes(bedTime);
  let payStartHour = convertPayHours(startHour);
  let payEndHour = convertPayHours(endHour);
  let totalPay = beforeBedPay() + bedPay() + afterMidnightPay();

  if (startHour > 23 || endHour > 23 || bedHour > 23) {
    throw new Error('Start time, end time, and bed time must be valid times');
  }

  if (startHour < 17 && startHour > 3) {
    throw new Error('Start time must be 5:00 p.m. or later');
  }

  if (endHour > 4 && endHour < 18) {
    throw new Error('End time must be 4:00 a.m. or earlier');
  }
  //If start hour is after midnight, and end hour is before, start hour is greater than end hour
  if (startHour < 4 && endHour > 17) {
    throw new Error('Start time must be before end time');
  //If end hour is before midnight, and start hour is greater than end hour
  } else if (endHour <= 23 && endHour > 4 && startHour > endHour) {
    throw new Error('Start time must be before end time');
  //If both start hour and end hour are after midnight and start hour is greater than end hour
  } else if (endHour <= 4 && startHour <= 3 && startHour > endHour){
    throw new Error('Start time must be before end time');
  }

  if (bedHour >= 0 && bedHour < 17) {
    throw new Error('Bed time must be before midnight');
  }

  //Rounds to the next hour for end time, assuming that if one minute in an hour is worked,
  //they get credit for the entire hour

  function convertEndTimeMinutes(time) {
    let hour = convertToMilitary(time);
    if (!time.includes('00')) {
      hour += 1;
    }
    return hour;
  }

  //Converts times to military time
  function convertToMilitary(time) {
    let hour = parseInt(time.split(':')[0]);
    if (time.split(' ')[1] === 'p.m.' && hour !== 12) {
      hour += 12;
    }
    if (time.split(' ')[1] === 'a.m.' && hour === 12) {
      hour = 0;
    }

    return hour;
  }

  //Adds 24 hours to times after midnight for pay calculations
  function convertPayHours(time) {
    if (time < 5) {
      let newTime = time + 24;
      return newTime;
    } else {
      return time;
    }
  }

  function beforeBedPay() {
    //Outside time frame
    if (payStartHour > bedHour) {
      return 0;
      //Both start time and end time within before bed hours
    } else if (payEndHour < bedHour) {
      return (payEndHour - payStartHour) * 12;
      //Regular calculation
    } else {
      return (bedHour - payStartHour) * 12;
    }
  }

  function bedPay() {
    //Outside time frame
    if (payStartHour >= 24 || payEndHour <= bedHour) {
      return 0;
      //Both start time and end time within bed time hours
    } else if (payStartHour >= bedHour && payEndHour <= 24) {
      return (payEndHour - payStartHour) * 8;
      //Start time before bed time, end time within bed time hours
    } else if (payStartHour < bedHour && payEndHour <= 24) {
      return (payEndHour - bedHour) * 8;
      //Start time within bed time hours, end time after bed time hours
    } else if (payStartHour >= bedHour && payEndHour > 24) {
      return (24 - payStartHour) * 8;
      //Both start time and end time outside of bed time hours
    } else {
      return (24 - bedHour) * 8;
    }
  }

  function afterMidnightPay() {
    //Outside time frame
    if (payEndHour < 24) {
      return 0;
      //Both start time and end time within after midnight hours
    } else if (payStartHour >= 24 && payEndHour < 28) {
      return (payEndHour - payStartHour) * 16;
      //Regular calculation
    } else {
      return (payEndHour - 24) * 16;
    }
  }

  return totalPay;
};
