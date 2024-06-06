const express = require('express');
const router = express.Router();
const Community = require('../models/community');

// get all communities, filters are passed in body of request
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const communities = await Community.find(req.body).skip(skip).limit(limit);
  res.send(communities);
});

// get community by id
router.get('/:id', async (req, res) => {
  const community = await Community.findById(req.params.id);
  res.send(community);
});

// create a new community
router.post('/', async (req, res) => {
  const community = new Community(req.body);
  await community.save();
  res.send(community);
});

// update community by id
router.put('/:id', async (req, res) => {
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
});

// delete community by id
router.delete('/:id', async (req, res) => {
  await Community.findByIdAndDelete(req.params.id);
  res.send('Community deleted successfully');
});

module.exports = router;