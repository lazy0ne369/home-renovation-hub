const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    ownerName: String,
    email: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ["apartment", "independent", "villa", "other"],
      default: "apartment"
    },
    builtUpAreaSqft: Number,
    budgetRange: String,
    bhk: Number,
    ageOfPropertyYears: Number,
    goals: [String],
    currentIssues: [String],
    improvementIdeas: [
      {
        title: String,
        description: String,
        estimatedCost: Number,
        impactScore: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.models.Property || mongoose.model("Property", PropertySchema);
