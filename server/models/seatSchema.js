const mongoose = require('mongoose');
const seatSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach',
    },
    row: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Row',
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    rowLetter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'empty',
    },
  },
  {
    timestamps: true,
  }
);

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
