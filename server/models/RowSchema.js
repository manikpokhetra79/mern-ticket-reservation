const mongoose = require('mongoose');
const rowSchema = new mongoose.Schema(
  {
    rowLetter: {
      type: String,
      required: true,
      unique: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach',
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat', // ref to the seat model
      },
    ],

    remSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Row = mongoose.model('Row', rowSchema);
module.exports = Row;
