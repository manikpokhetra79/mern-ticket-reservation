const mongoose = require('mongoose');
const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    rows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Row',
      },
    ],
    remSeats: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Coach = mongoose.model('Coach', coachSchema);
module.exports = Coach;
