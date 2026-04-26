const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors({
  origin: "https://item-manager2435.netlify.app"  // replace with your actual Netlify URL
}));
app.use(express.json());

// Connect to MongoDB with proper timeout configuration
mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 5000,      // Fail fast if can't connect
  socketTimeoutMS: 30000,       // 30s timeout for socket operations
  serverSelectionTimeoutMS: 5000 // Timeout for server selection
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1); // Exit if connection fails
});

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

// Only start server after successful MongoDB connection
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});