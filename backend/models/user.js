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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
    default: [],
  },
  communities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Community',
    default: [],
  },
  profileImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userSchema);
