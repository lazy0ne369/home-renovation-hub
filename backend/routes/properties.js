const express = require("express");
const router = express.Router();
const connectDB = require("../db");
const Property = require("../models/Property");

router.get("/", async (req, res) => {
  try {
    await connectDB();
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    await connectDB();
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
