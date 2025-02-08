const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB Connected"));
db.on("error", (err) => console.error("MongoDB Connection Error:", err));

// Donor Schema
const donorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  phone: String,
  bloodGroup: String,
  age: Number,
  weight: Number,
  lastDonation: String,
  medicalConditions: String,
});

const Donor = mongoose.model("Donor", donorSchema);

// API Endpoint to Store Donor Data
app.post("/api/donors", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register donor" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
