const express = require('express');
const router = express.Router();
const multer = require('multer');

const Community = require('../models/community');
const Event = require('../models/event');
const User = require('../models/user');
const Mod = require('../models/mod');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
