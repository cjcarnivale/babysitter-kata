'use strict'; 

module.exports = function hourCalculator(startTime, endTime, bedTime) {
  if (!startTime || !endTime || !bedTime) {
    throw new Error('Must enter start time, end time, and bed time'); 
  }
  
  let startHour = convertToMilitary(startTime);
  let endHour = convertEndTimeMinutes(endTime);
  let bedHour = convertEndTimeMinutes(bedTime);
  let totalHours = totalTime(startHour, endHour);
  let remainingHours = 0;  

  if (startHour > 23 || endHour > 23 || bedHour > 23){
    throw new Error('Start time, end time, and bed time must be valid times'); 
  }

  if (startHour < 17 && startHour > 4){
    throw new Error('Start time must be 5:00 p.m. or later');
  }

  if (endHour > 4  && endHour < 18){
    throw new Error('End time must be 4:00 a.m. or earlier'); 
  }

  if (startHour < 4 && endHour > 17) {
    throw new Error('Start time must be before end time');
  } else if (endHour <= 23 && endHour > 4 && startHour > endHour){
    throw new Error('Start time must be before end time'); 
  }
 
  if (bedHour >= 0 && bedHour < 17) {
    throw new Error('Bed time must be before midnight'); 
  }

  //Rounds to the next hour for end time, assuming that if one minute in an hour is worked, 
  //they get credit for the entire hour

  function convertEndTimeMinutes(time){
    let hour = convertToMilitary(time);
    if (!time.includes('00')){
      hour += 1; 
    }
    return hour; 
  }

  //Converts times to military time
  function convertToMilitary(time){
    let hour = parseInt(time.split(':')[0]);
    if (time.split(' ')[1] === 'p.m.' && hour !== 12){
      hour += 12;
    }
    if (time.split(' ')[1] === 'a.m.' && hour === 12 ){
      hour = 0;
    }

    return hour; 
  }

  //Calculates total time worked
  function totalTime(startTime, endTime){
    if (startTime < 17){
      startTime += 24;
    }
    if (endTime < 17){
      endTime += 24;
    }

    return endTime - startTime; 
  }

  function beforeBedPay(){
    let startHours = bedHour - startHour;
    if (startHour < bedHour && totalHours >= startHours && startHour > 4){
      remainingHours = totalHours - startHours;
      return startHours * 12; 
    } else if(totalHours < startHours && startHour > 4){
      return totalHours * 12; 
    } else {
      return 0;
    }
  }

  function bedPay(){
    let bedHours = 24 - bedHour; 
    if (startHour <= bedHour && remainingHours >= bedHours){
      remainingHours -= bedHours;
      return bedHours * 8;
    } else if (remainingHours < bedHours && remainingHours !== 0){
      return remainingHours * 8;
    } else {
      return 0; 
    }
  }

  function afterMidnightPay(){
    console.log(bedPay());
    if (endHour > 0 && endHour <=4 && startHour >= 17){
      return endHour * 16;
    } else if (startHour < 4 && remainingHours !== 0){
      return remainingHours * 16;
    }
    else if (startHour < 4 && endHour < 4){
      return (endHour - startHour) * 16; 
    }
    else {
      return 0;
    }
  }

  return (beforeBedPay() + bedPay() + afterMidnightPay()); 
}; 
