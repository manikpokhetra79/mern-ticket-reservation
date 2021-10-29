const Seat = require('../../models/seatSchema');
const Row = require('../../models/RowSchema');
const Coach = require('../../models/CoachSchema');
module.exports.bookSeats = async (req, res) => {
  let coach = await initializeDB();
  return res.status(200).json({
    message: 'successfully created',
    coach: coach,
  });
};

let initializeDB = async () => {
  try {
    let newCoach = await Coach.findOne({ name: 'railway' });
    if (newCoach) {
      // do something
      console.log('alreaady done');
    } else {
      //create coach collection
      newCoach = await Coach.create({
        name: 'railway',
        rows: [],
        remseats: 80,
      });
    }
    if (newCoach.rows.length == 0) {
      for (let i = 0; i < 11; i++) {
        let letter = String.fromCharCode(65 + i);
        let newRow = await Row.create({
          rowLetter: letter,
          seats: [],
          remSeats: 7,
        });
        await newCoach.rows.push(newRow);
        await newCoach.save();
      }
      // push last row with  seats to rows array
      let letter = String.fromCharCode(65 + 11);
      let newRow = await Row.create({
        rowLetter: letter,
        seats: [],
        remSeats: 3,
      });
      await newCoach.rows.push(newRow);
      await newCoach.save();
    }
    return newCoach;
  } catch (error) {
    console.log('error in initialing db', error);
    return;
  }
};
