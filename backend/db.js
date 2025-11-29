const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  if (!MONGODB_ATLAS_URI) {
    throw new Error("MONGODB_ATLAS_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(MONGODB_ATLAS_URI, {
      dbName: MONGODB_DB || "home_renovation_hub"
    });
    isConnected = true;
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
