const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// get all events, filters are passed in body of request
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const community = (req.query.community) || '';

    let events = [];
    if (community) {
      events = await Event.find({ community }).skip(skip).limit(limit);
    } else {
      events = await Event.find().skip(skip).limit(limit);
    }
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get event by id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create a new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update event by id
router.put('/:id', async (req, res) => {
  try {
    const { name, description, date, venue, volunteer, status } = req.body;
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (date) updatedFields.date = date;
    if (venue) updatedFields.venue = venue;
    if (volunteer) {
      const event = await Event.findById(req.params.id);
      if (!event.volunteers.includes(volunteer)) {
        updatedFields.volunteers = [...event.volunteers, volunteer];
      }
    }
    if (status) updatedFields.status = status;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    res.send(updatedEvent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put('/rmuser/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    event.volunteers = event.volunteers.filter((volunteer) => volunteer != userId);
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// delete event by id
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
