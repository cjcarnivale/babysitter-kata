'use strict'; 

module.exports = function hourCalculator(startTime, endTime, bedTime) {

  let newStartTime = convertToMilitary(startTime); 

  if (!bedTime) {
    throw new Error('Must enter start time, end time, and bed time'); 
  }

  if (newStartTime < 17 && newStartTime > 4){
    throw new Error('Start time must be 5:00 p.m. or later');
  }

  function convertToMilitary(time){
    let hour = parseInt(time.split(':')[0]);
    if (time.split(' ')[1] === 'p.m.'){
      hour += 12;
    }
    return hour; 
  }

}; 
