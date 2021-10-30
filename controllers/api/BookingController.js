const Seat = require('../../models/seatSchema');
const Row = require('../../models/RowSchema');
const Coach = require('../../models/CoachSchema');

module.exports.bookSeats = async (req, res) => {
  try {
    //initialize the db
    await initializeDB();

    let newCoach = await Coach.findOne({ name: 'railway' }).populate('rows');
    let seats = parseInt(req.body.seats);
    // console.log(req.body, 'seats to be booked');
    // use logics
    if (seats <= newCoach.remSeats) {
      let row = newCoach.rows;
      // seat booking logic starts here
      if (row[11].remSeats >= seats) {
        let seatsArray = [];
        //fill seats in last row
        let length = row[11].totalSeats;
        let initialIndex = length - row[11].remSeats;

        for (let i = initialIndex; i < initialIndex + seats; i++) {
          //book seats and add them to the array
          let seat = await Seat.create({
            coach: newCoach.id,
            seatNumber: i + 1,
            row: row[11].id,
            rowLetter: row[11].rowLetter,
            status: 'booked',
          });
          // push seat to row array
          await row[11].seats.push(seat);
          // push created tickets to seatsArray
          seatsArray.push(seat);
          //save row
          await row[11].save();
        }
        // update remSeats in row
        row[11].remSeats = (await row[11].remSeats) - seats;
        await row[11].save();
        // console.log('booked in last row');
        // update overall remaining seats in coach
        newCoach.remSeats = (await newCoach.remSeats) - seats;
        await newCoach.save();
        return res.status(200).json({
          message: 'successfully created',
          coach: newCoach,
          seats: seatsArray,
          status: 'success',
        });
      } else {
        //go to all rows and check which row has required seats
        let bookingArray = [];
        bookingArray = await fillSeats(row, newCoach, seats, bookingArray);
        // update overall remaining seats in coach
        newCoach.remSeats = (await newCoach.remSeats) - seats;
        await newCoach.save();
        return res.status(200).json({
          message: 'successfully created',
          coach: newCoach,
          seats: bookingArray,
        });
      }
      // seat booking logic ends here //
    } else {
      return res.status(400).json({
        message: 'Not enough seats',
        status: 'error',
        coach: newCoach,
      });
    }
  } catch (error) {
    console.log('error in', error);
  }
};
// utility to book seats
let fillSeats = async (rowsArray, newCoach, seats, bookingArray) => {
  try {
    for (let row of rowsArray) {
      //when row has all the required seats to be booked
      if (row.remSeats >= seats) {
        //go to the row and fill the seats
        let length = row.totalSeats;
        let initialIndex = length - row.remSeats;
        for (let i = initialIndex; i < initialIndex + seats; i++) {
          // create seats
          let seat = await Seat.create({
            coach: newCoach.id,
            seatNumber: i + 1,
            row: row.id,
            rowLetter: row.rowLetter,
            status: 'booked',
          });
          // push seat to row array
          await row.seats.push(seat);
          // push created tickets to seatsArray

          bookingArray.push(seat);
          //save row
          await row.save();
        }
        // console.log('booked completely in row');
        // update remSeats in row
        row.remSeats = (await row.remSeats) - seats;
        await row.save();
        // console.log(bookingArray);
        return bookingArray;
      }
    }

    // if we didnot return it means seats are not booked
    // that is not a single row has total of seats to be booked
    // so we will divide seats in different rows
    let seatsTobeBooked = seats;
    for (let row of rowsArray) {
      let length = row.totalSeats;
      let initialIndex = length - row.remSeats;
      let endIndex;
      if (seatsTobeBooked >= row.remSeats) {
        endIndex = length;
      } else {
        endIndex = initialIndex + seatsTobeBooked;
      }
      //seats that can be booked in this array
      let seatsBooked = endIndex - initialIndex;
      for (let i = initialIndex; i < endIndex; i++) {
        let seat = await Seat.create({
          coach: newCoach.id,
          seatNumber: i + 1,
          row: row.id,
          rowLetter: row.rowLetter,
          status: 'booked',
        });
        // console.log('booked partially row');
        // push seat to row array...
        await row.seats.push(seat);
        // push created tickets to seatsArray
        bookingArray.push(seat);
        //save row...
        await row.save();
      }

      row.remSeats = (await row.remSeats) - seatsBooked;
      await row.save();
      seatsTobeBooked = (await seatsTobeBooked) - seatsBooked;
      if (seatsTobeBooked == 0) {
        // console.log(bookingArray);
        return bookingArray;
      }
    }
    // console.log(bookingArray);
    return bookingArray;
  } catch (error) {
    console.log(error);
  }
};

// initialize db function
let initializeDB = async () => {
  try {
    // since there is one coach , we will be taking default coach with name as"railway"
    let newCoach = await Coach.findOne({ name: 'railway' });
    if (newCoach) {
      // do something
      console.log('already developed');
    } else {
      //create coach collection
      newCoach = await Coach.create({
        name: 'railway',
        rows: [],
        remSeats: 80,
      });
    }
    if (newCoach.rows.length == 0) {
      for (let i = 0; i < 11; i++) {
        let letter = String.fromCharCode(65 + i);
        let newRow = await Row.create({
          rowLetter: letter,
          seats: [],
          remSeats: 7,
          totalSeats: 7,
          coach: newCoach.id,
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
        totalSeats: 3,
        coach: newCoach.id,
      });
      await newCoach.rows.push(newRow);
      await newCoach.save();
    }
    return;
  } catch (error) {
    console.log('error in initialing db', error);
    return;
  }
};
// action to remove all rows and seats of coach for testing purposes

module.exports.deleteAll = async (req, res) => {
  try {
    let newCoach = await Coach.findOne({ name: 'railway' });
    await Seat.deleteMany({ coach: newCoach.id });
    await Row.updateMany(
      { coach: newCoach.id },
      { $set: { seats: [], remSeats: 7 } }
    );
    await Row.updateOne({ rowLetter: 'L' }, { $set: { remSeats: 3 } });

    await newCoach.updateOne({ remSeats: 80 });
    // console.log(newCoach.remSeats);
    return res.status(200).json({
      message: 'coach emptied',
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
