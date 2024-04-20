const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  events: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event'
  },
  mod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mod'
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
});

module.exports = mongoose.model('Community', communitySchema);