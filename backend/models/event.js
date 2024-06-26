const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  requirement: {
    type: Number,
    required: true,
  },
  volunteers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Live', 'Closed', 'Cancelled', 'Ended'],
    default: 'Upcoming',
  },
  banner: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Event', eventSchema);
