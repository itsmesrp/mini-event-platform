const Event = require("../models/Event");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      dateTime: req.body.dateTime,
      location: req.body.location,
      capacity: req.body.capacity,
      imageUrl: req.file ? req.file.path : null,
      createdBy: req.userId,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ dateTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RSVP - Join Event
exports.joinEvent = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.userId;

  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: userId }, // no duplicate
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }, // capacity check
      },
      {
        $push: { attendees: userId },
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: "Event is full or already joined",
      });
    }

    res.json({
      message: "Successfully joined event",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RSVP - Leave Event
exports.leaveEvent = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.userId;

  try {
    await Event.findByIdAndUpdate(eventId, {
      $pull: { attendees: userId },
    });

    res.json({ message: "Left event successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
