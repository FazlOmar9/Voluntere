const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  events: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
    default: [],
  },
  mod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mod',
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
});

module.exports = mongoose.model('Community', communitySchema);
