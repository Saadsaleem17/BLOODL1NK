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


app.get("/api/donors", async (req, res) => {
  try {
    const { bloodGroup } = req.query;

    let query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup; // Filter only by blood group

    const donors = await Donor.find(query);
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donors" });
  }
});


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyDJ_1NN0wod4DMW1kpx3Bnn7O5bKdJsaDw");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Extract blood group and city from the message
    const bloodGroupMatch = message.match(/(A\+|A-|B\+|B-|AB\+|AB-|O\+|O-)/i);
    const cityMatch = message.match(/in (\w+)/i); // Extracts "in CityName"

    const bloodGroup = bloodGroupMatch ? bloodGroupMatch[0].toUpperCase() : null;
    const city = cityMatch ? cityMatch[1] : null;

    if (message.toLowerCase().includes("list donors")) {
      let query = {};
      if (bloodGroup) query.bloodGroup = bloodGroup;
      if (city) query.city = new RegExp(city, "i"); // Case-insensitive search

      const donors = await Donor.find(query).select("firstName lastName city bloodGroup");

      if (donors.length === 0) {
        return res.json({ response: `No donors found${bloodGroup ? ` for ${bloodGroup}` : ""}${city ? ` in ${city}` : ""}.` });
      }

      const donorNames = donors.map(d => `${d.firstName} ${d.lastName}`).join(", ");
      return res.json({ response: `Available donors${bloodGroup ? ` for ${bloodGroup}` : ""}${city ? ` in ${city}` : ""}: ${donorNames}.` });
    }

    // If no donor query, use Gemini AI
    const prompt = `You are a helpful assistant for BLOODL1NK, a blood bank system. You help users with blood donation, finding donors, and answering questions about blood types and donation eligibility.
    
    User: ${message}
    Assistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ response: text });

  } catch (error) {
    console.error("Error processing chatbot request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

