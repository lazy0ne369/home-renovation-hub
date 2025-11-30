const express = require("express");
const router = express.Router();
const connectDB = require("../db");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/auth");

const ensureAdmin = (user) => user?.role === "admin";

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    await connectDB();
    const properties = await Property.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: properties });
  } catch (error) {
    console.error("Fetch properties error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch property records" });
  }
});

router.get("/admin", async (req, res) => {
  if (!ensureAdmin(req.user)) {
    return res
      .status(403)
      .json({ success: false, error: "Admin privileges required" });
  }

  try {
    await connectDB();
    const properties = await Property.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: properties });
  } catch (error) {
    console.error("Fetch admin properties error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to fetch admin property records",
      });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await connectDB();
    const property = await Property.findById(req.params.id).lean();

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    const isOwner = property.user?.toString() === req.user.id;
    if (!isOwner && !ensureAdmin(req.user)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    console.error("Fetch property detail error:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch property" });
  }
});

router.post("/", async (req, res) => {
  const {
    ownerName,
    email,
    phone,
    address,
    city,
    state,
    propertyType,
    yearBuilt,
    bedrooms,
    bathrooms,
    squareFootage,
    lotSize,
    condition,
    currentValue,
    budgetRange,
    timeline,
    goals,
    currentIssues,
    improvementIdeas,
    notes,
  } = req.body || {};

  if (!address) {
    return res
      .status(400)
      .json({ success: false, error: "Property address is required" });
  }

  try {
    await connectDB();

    const property = await Property.create({
      user: req.user.id,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      propertyType,
      yearBuilt,
      bedrooms,
      bathrooms,
      squareFootage,
      lotSize,
      condition,
      currentValue,
      budgetRange,
      timeline,
      goals,
      currentIssues,
      improvementIdeas,
      notes,
    });

    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error("Create property error:", error.message);
    res.status(500).json({ success: false, error: "Failed to save property" });
  }
});

module.exports = router;
