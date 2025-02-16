const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path=require("path")
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

const PORT = process.env.PORT || 5000;
console.log("Serving static files from:", path.join(__dirname, "client", "dist"));

app.use(express.static(path.join(__dirname,"client","dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./client/dist/index.html",))
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});