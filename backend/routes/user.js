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
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post('/auth', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        res.send(user);
      } else {
        res.status(400).send({ message: 'Invalid password' });
      }
    } else {
      res.status(400).send({ message: 'User not found' });
    }
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
    const { username, oldPassword, newPassword, event, community } =
      req.body;
    const updatedFields = {};
    const user = await User.findOne({ username });

    if (event) {
      updatedFields.events = [...user.events, event];
    }

    if (community) {
      updatedFields.communities = [...user.communities, community];
    }

    if (oldPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (isPasswordMatch) {
        updatedFields.password = await bcrypt.hash(newPassword, saltRounds);
      } else {
        return res.status(400).send({ message: 'Invalid old password' });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      updatedFields,
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// remove an event by id
router.put('/rmevent', async (req, res) => {
  try {
    const { username, eventId } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const updatedEvents = user.events.filter(
        (event) => event.toString() !== eventId
      );
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { events: updatedEvents },
        { new: true }
      );
      res.send(updatedUser);
    } else {
      res.status(400).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// remove a community by id
router.put('/rmcommunity', async (req, res) => {
  try {
    const { username, communityId } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const updatedCommunities = user.communities.filter(
        (community) => community.toString() !== communityId
      );
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { communities: updatedCommunities },
        { new: true }
      );
      res.send(updatedUser);
    } else {
      res.status(400).send({ message: 'User not found' });
    }
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
