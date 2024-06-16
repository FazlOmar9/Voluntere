const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const saltRounds = 10;

// get all users, filters are passed in body of request, exclude password
router.get('/', async (req, res) => {
  try {
    const users = await User.find(req.body).select('-password');
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, saltRounds);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update user by id
router.put('/:id', async (req, res) => {
  try {
    const { username, oldPassword, newPassword, events, communities } =
      req.body;
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
        return res.status(400).send({ message: 'Invalid old password' });
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
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete user by id
router.delete('/:id', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      await User.findByIdAndDelete(req.params.id);
      res.send({ message: 'User deleted successfully' });
    } else {
      res.status(400).send({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
