// Combined Single-File Node.js Server (Express + Multer)
// Save this as server.js and run: node server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// ================= STORAGE CONFIG =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create uploads folder if not exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Serve uploaded files
app.use('/uploads', express.static(uploadPath));

// ================= ROUTES =================

// Test Route
app.get('/', (req, res) => {
  res.send("Server is running!");
});

// Upload Image Route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully',
    fileUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });
});

// General Purpose AI Response
app.post('/general-purpose', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  // Dummy Reply for Now
  res.json({ reply: `AI Response for: ${prompt}` });
});

// Schedule Feature
app.post('/schedule', (req, res) => {
  const { task, time } = req.body;

  if (!task || !time) {
    return res.status(400).json({ error: 'Task and Time are required' });
  }

  res.json({
    message: 'Schedule saved successfully',
    task,
    time
  });
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
