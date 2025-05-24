const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


MONGO_URI = "mongodb+srv://akshatneema01:oFNGQpc391kgUJpB@cluster0.zvfekof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 20000, // Increase timeout
  })
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
  
  // ✅ Handle Mongoose connection events
  mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to DB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Mongoose disconnected");
  });

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));