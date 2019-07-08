# Babysitter Kata

## Requirements
[Original Link](https://gist.github.com/jameskbride/5482722)

Background
----------
This kata simulates a babysitter working and getting paid for one night.  The rules are pretty straight forward:

The babysitter 
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)


Feature:
As a babysitter
In order to get paid for 1 night of work
I want to calculate my nightly charge


## Assumptions
1.  If babysitter starts 1 minute or greater into a new hour, they get credit for the whole hour. 
2.  Bed time gets rounded to the next whole hour.
3.  Bed time can not be after midnight.
4.  Input format will always be hh:mm a.m./p.m. ParseInt will return the same value for '04' and '4'. 

## Improvements
1.  Validated hour input.  Wrote tests to validate a.m./p.m. present in input and found if they were missing,
    other tests failed. Did not validate minutes and only used them to round. A regular expression could be used
    to validate both the format and the ranges for start, bed, and end times.
2.  A library that handles time could be used for time conversions.

## Tech Used
- Node 11.10.1
- NPM 6.7.0
- Mocha
- Chai

## Set-up instructions:
1. Clone repo to local machine
2. `npm install`
3. `npm test` to run tests