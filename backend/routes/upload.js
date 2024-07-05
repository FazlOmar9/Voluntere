const express = require('express');
const router = express.Router();
const multer = require('multer');

const Community = require('../models/community');
const Event = require('../models/event');
const User = require('../models/user');

router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    return cb(
      null,
      req.body.type + '-' + req.body.id + '-' + file.originalname
    );
  },
});

router.post('/', multer({ storage }).single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    if (req.body.type === 'user') {
      await User.findOneAndUpdate(
        { username: req.body.id },
        {
          profileImage:
            'http://localhost:3010/images/' +
            req.body.type +
            '-' +
            req.body.id +
            '-' +
            file.originalname,
        },
        { new: true }
      );
    }
    res.send('File uploaded successfully.');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
