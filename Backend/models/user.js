const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  events: {
    // Array of event ids, which are references to the Event model
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
  },
  communities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Community',
  },
});

module.exports = mongoose.model('User', userSchema);
