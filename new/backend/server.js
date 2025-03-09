const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("DEBUG: MONGO_URI =", MONGO_URI); // Debugging line

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const chatRoute = require('./routes/chat');
app.use('/api',chatRoute);  

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ❌ FIXED: Incorrect string interpolation in console.log()
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
