const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory storage (replace with a database in production)
let presets = {};

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Get all presets
app.get('/api/presets', (req, res) => {
  res.json(presets);
});

// Save a preset
app.post('/api/presets', (req, res) => {
  const { presetName, preset } = req.body;
  presets[presetName] = preset;
  res.json({ message: 'Preset saved successfully' });
});

// Delete a preset
app.delete('/api/presets/:presetName', (req, res) => {
  const { presetName } = req.params;
  if (presets[presetName]) {
    delete presets[presetName];
    res.json({ message: 'Preset deleted successfully' });
  } else {
    res.status(404).json({ error: 'Preset not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});