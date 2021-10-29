const mongoose = require('mongoose');
const seatSchema = new mongoose.Schema(
  {
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coach',
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    row: {
      type: Number,
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
