'use strict'; 

module.exports = function hourCalculator(startTime, endTime, bedTime) {

  let startHour = convertToMilitary(startTime);
  let endHour = convertEndTimeMinutes(endTime); 

  if (!bedTime) {
    throw new Error('Must enter start time, end time, and bed time'); 
  }

  if (startHour < 17 && startHour > 4){
    throw new Error('Start time must be 5:00 p.m. or later');
  }

  if (endHour > 4  && endHour < 18){
    throw new Error('End time must be 4:00 a.m. or earlier'); 
  }

  function convertEndTimeMinutes(time){
    let hour = convertToMilitary(time);
    if (!time.includes('00')){
      hour += 1; 
    }
    return hour; 
  }

  function convertToMilitary(time){
    let hour = parseInt(time.split(':')[0]);
    if (time.split(' ')[1] === 'p.m.'){
      hour += 12;
    }
    return hour; 
  }

}; 
