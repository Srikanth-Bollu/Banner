// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Srikanth:Srikanth04*@cluster0.tnvf745.mongodb.net/banner');

// Define the Banner Schema
const bannerSchema = new mongoose.Schema({
  isVisible: { type: Boolean, default: true },
  description: String,
  timer: Number,
  link: String,
});

const Banner = mongoose.model('Banner', bannerSchema);

// Create initial banner data if not exist
(async () => {
  try {
    const banner = await Banner.findOne({});
    if (!banner) {
      const initialBanner = new Banner({
        description: 'Welcome to our website!',
        timer: 10,
        link: 'https://example.com',
      });
      await initialBanner.save();
    }
  } catch (err) {
    console.error('Error creating initial banner:', err);
  }
})();



// API endpoint to update the banner
app.post('/api/banner', async (req, res) => {
    try {
      const banner = await Banner.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(banner);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // API endpoint to get the banner
  app.get('/api/banner', async (req, res) => {
    try {
      const banner = await Banner.findOne({});
      if (banner) {
        res.json(banner);
      } else {
        res.status(404).json({ message: "Banner not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

app.listen(5000, () => console.log('Server started on port 5000'));
