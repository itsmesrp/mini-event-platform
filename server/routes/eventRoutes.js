const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { joinEvent, leaveEvent } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getEvents);
router.post("/", protect, upload.single("image"), createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.post("/:id/join", protect, joinEvent);
router.post("/:id/leave", protect, leaveEvent);

module.exports = router;
