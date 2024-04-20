const mongoose = require('mongoose');

const modSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true,
        immutable: true
    }
  });

module.exports = mongoose.model('Mod', modSchema);