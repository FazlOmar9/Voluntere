const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// get all events, filters are passed in body of request
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const events = await Event.find(req.body).skip(skip).limit(limit);
  res.send(events);
});

// get event by id
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.send(event);
});

// create a new event
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.send(event);
});

// update event by id
router.put('/:id', async (req, res) => {
  const { name, description, date, venue, volunteers, status } = req.body;
  const updatedFields = {};

  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (date) updatedFields.date = date;
  if (venue) updatedFields.venue = venue;
  if (volunteers) updatedFields.volunteers = volunteers;
  if (status) updatedFields.status = status;

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true }
  );
  res.send(updatedEvent);
});

// delete event by id
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.send('Event deleted successfully');
});

module.exports = router;