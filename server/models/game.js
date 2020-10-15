const mongoose = require('mongoose');


const TimestampSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  hand: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});

const GameSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  players: [String],
  timestamps: [TimestampSchema],
  endTime : Date,
});

GameSchema.methods.show = function () {
  console.log('DB: Added', this.uuid);
}

module.exports = mongoose.model("Game", GameSchema);
