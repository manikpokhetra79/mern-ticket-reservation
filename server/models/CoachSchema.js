const mongoose = require('mongoose');
const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat', // ref to the seat model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Coach = mongoose.model('Coach', coachSchema);
module.exports = Coach;
