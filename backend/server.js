require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const propertyRoutes = require("./routes/properties");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Renovation Hub API (MongoDB Atlas)");
});

connectDB().catch(err => {
  console.error("Failed to connect to MongoDB Atlas:", err.message);
  process.exit(1);
});

app.use("/api/properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
