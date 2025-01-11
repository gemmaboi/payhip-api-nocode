import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with a database in production)
let presets = {};

// Routes
app.get('/api/presets', (req, res) => {
  res.json(presets);
});

app.post('/api/presets', (req, res) => {
  const { presetName, preset } = req.body;
  if (!presetName || !preset) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  presets[presetName] = preset;
  res.json({ success: true });
});

app.delete('/api/presets/:name', (req, res) => {
  const { name } = req.params;
  if (presets[name]) {
    delete presets[name];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Preset not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
