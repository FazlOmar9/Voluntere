const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Mod = require('../models/mod');

const saltRounds = 10;

// get all mods, filters are passed in body of request, exclude password
router.get('/', async (req, res) => {
  const mods = await Mod.find(req.body).select('-password');
  res.send(mods);
});

// get mod by id
router.get('/:id', async (req, res) => {
  const mod = await Mod.findById(req.params.id);
  res.send(mod);
});

// create a new mod
router.post('/', async (req, res) => {
  const mod = new Mod(req.body);
  mod.password = await bcrypt.hash(mod.password, saltRounds);
  await mod.save();
  res.send(mod);
});

// update mod by id
router.put('/:id', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const updatedFields = {};

    if (username) {
        updatedFields.username = username;
    }

    if (oldPassword && newPassword) {
        const mod = await Mod.findById(req.params.id);
        const isPasswordMatch = await bcrypt.compare(oldPassword, mod.password);
        if (isPasswordMatch) {
            updatedFields.password = await bcrypt.hash(newPassword, saltRounds);
        } else {
            return res.status(400).send('Invalid old password');
        }
    }

    const updatedMod = await Mod.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
    );
    res.send(updatedMod);
});

// delete mod by id
router.delete('/:id', async (req, res) => {
    const { password } = req.body;
    const mod = await Mod.findById(req.params.id);
    const isPasswordMatch = await bcrypt.compare(password, mod.password);
    if (isPasswordMatch) {
        await Mod.findByIdAndDelete(req.params.id);
        res.send('Mod deleted successfully');
    } else {
        res.status(400).send('Invalid password');
    }
});

module.exports = router;