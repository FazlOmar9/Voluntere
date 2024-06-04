const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

// get all users, filters are passed in body of request, exclude password
router.get('/', async (req, res) => {
  const users = await User.find(req.body).select('-password');
  res.send(users);
});

// get user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// create a new user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, saltRounds);
  await user.save();
  res.send(user);
});

// update user by id
router.put('/:id', async (req, res) => {
  const { username, oldPassword, newPassword, events, communities } = req.body;
  const updatedFields = {};

  if (username) {
    updatedFields.username = username;
  }

  if (oldPassword && newPassword) {
    const user = await User.findById(req.params.id);
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (isPasswordMatch) {
      updatedFields.password = await bcrypt.hash(newPassword, saltRounds);
    } else {
      return res.status(400).send('Invalid old password');
    }
  }

  if (events) {
    updatedFields.events = events;
  }

  if (communities) {
    updatedFields.communities = communities;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true }
  );
  res.send(updatedUser);
});

// delete user by id
router.delete('/:id', async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.params.id);
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (isPasswordMatch) {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted successfully');
  } else {
    res.status(400).send('Invalid password');
  }
});

module.exports = router;
