const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    propertyType: {
      type: String,
      enum: [
        "apartment",
        "independent",
        "villa",
        "single-family",
        "condo",
        "townhouse",
        "multi-family",
        "other",
      ],
      default: "single-family",
    },
    yearBuilt: Number,
    bedrooms: Number,
    bathrooms: Number,
    squareFootage: Number,
    lotSize: Number,
    condition: {
      type: String,
      enum: ["excellent", "good", "fair", "needs-work", "unknown"],
      default: "unknown",
    },
    currentValue: Number,
    budgetRange: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    goals: {
      type: String,
      trim: true,
    },
    currentIssues: [String],
    improvementIdeas: [
      {
        title: String,
        description: String,
        estimatedCost: Number,
        impactScore: Number,
      },
    ],
    status: {
      type: String,
      enum: ["submitted", "reviewing", "in-progress", "completed"],
      default: "submitted",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);
