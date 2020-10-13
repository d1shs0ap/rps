const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  uuid: String,
  p1: String,
  timestamps1: [Number],
  p2: String,
  timestamps2: [Number],
});

module.exports = mongoose.model("Game", GameSchema);
