const express = require('express');
const router = express.Router();
const Community = require('../models/community');

// get all communities, filters are passed in body of request
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find(req.body).skip(skip).limit(limit);
    res.send(communities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get community by id
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    res.send(community);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create a new community
router.post('/', async (req, res) => {
  try {
    const community = new Community(req.body);
    await community.save();
    res.send(community);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update community by id
router.put('/:id', async (req, res) => {
  try {
    const { name, description, events, members } = req.body;
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (events) updatedFields.events = events;
    if (members) updatedFields.members = members;

    const updatedCommunity = await Community.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    res.send(updatedCommunity);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete community by id
router.delete('/:id', async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.id);
    res.send({ message: 'Community deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
