const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentDB';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const { ObjectId } = mongoose.Types;

// Recursive preprocessor to convert strings to ObjectIds and Dates
function preprocessCommand(obj) {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    // Match 24-character hexadecimal ObjectId strings
    if (/^[0-9a-fA-F]{24}$/.test(obj)) {
      try {
        return new ObjectId(obj);
      } catch (e) {
        return obj;
      }
    }
    // Match ISO-8601 date strings
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/.test(obj)) {
      const date = new Date(obj);
      return isNaN(date.getTime()) ? obj : date;
    }
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(preprocessCommand);
  }
  
  if (typeof obj === 'object') {
    if (obj instanceof ObjectId || obj instanceof Date) {
      return obj;
    }
    
    // Support MongoDB EJSON ObjectId {"$oid": "..."}
    if (obj.$oid && typeof obj.$oid === 'string') {
      try {
        return new ObjectId(obj.$oid);
      } catch (e) {}
    }
    
    // Support MongoDB EJSON Date {"$date": "..."}
    if (obj.$date) {
      const dateStr = typeof obj.$date === 'object' && obj.$date.$numberLong
        ? parseInt(obj.$date.$numberLong, 10)
        : obj.$date;
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    const newObj = {};
    for (const key of Object.keys(obj)) {
      newObj[key] = preprocessCommand(obj[key]);
    }
    return newObj;
  }
  
  return obj;
}

// Single endpoint for raw MongoDB command execution
app.post('/api/command', async (req, res) => {
  try {
    let command = req.body;
    if (command && command.command) {
      command = command.command;
    }

    if (!command || Object.keys(command).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No MongoDB command provided in request body'
      });
    }

    const processedCommand = preprocessCommand(command);
    const db = mongoose.connection.db;
    const result = await db.command(processedCommand);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Command execution failed',
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Student CRUD API (Command Mode)',
    endpoints: {
      'POST /api/command': 'Execute any MongoDB command on the database. Example body: { "find": "students" }'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
