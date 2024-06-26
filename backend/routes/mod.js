const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Mod = require('../models/mod');

const saltRounds = 10;

// get all mods, filters are passed in body of request, exclude password
router.get('/', async (req, res) => {
  try {
    const mods = await Mod.find(req.body).select('-password');
    res.send(mods);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get mod by id
router.get('/:id', async (req, res) => {
  try {
    const mod = await Mod.findOne({username: req.params.username});
    res.send(mod);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create a new mod
router.post('/', async (req, res) => {
  try {
    const mod = new Mod(req.body);
    mod.password = await bcrypt.hash(mod.password, saltRounds);
    await mod.save();
    res.send(mod);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// auth a login
router.post('/auth', async (req, res) => {
  try {
    const { username, password } = req.body;
    const mod = await Mod.findOne({ username });
    if (mod) {
      const isPasswordMatch = await bcrypt.compare(password, mod.password);
      if (isPasswordMatch) {
        res.send(mod);
      } else {
        res.status(400).send({ message: 'Invalid password' });
      }
    } else {
      res.status(400).send({ message: 'Mod not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update mod by username
router.put('/', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const updatedFields = {};
    
    if (oldPassword && newPassword) {
      const mod = await Mod.findOne({ username });
      const isPasswordMatch = await bcrypt.compare(oldPassword, mod.password);
      if (isPasswordMatch) {
        updatedFields.password = await bcrypt.hash(newPassword, saltRounds);
      } else {
        return res.status(400).send({ message: 'Invalid old password' });
      }
    }

    const updatedMod = await Mod.findOneAndUpdate(
      { username },
      updatedFields,
      { new: true }
    );
    res.send(updatedMod);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete mod by id
router.delete('/:id', async (req, res) => {
  try {
    const { password } = req.body;
    const mod = await Mod.findById(req.params.id);
    const isPasswordMatch = await bcrypt.compare(password, mod.password);
    if (isPasswordMatch) {
      await Mod.findByIdAndDelete(req.params.id);
      res.send({ message: 'Mod deleted successfully' });
    } else {
      res.status(400).send({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
