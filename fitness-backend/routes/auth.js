// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// router.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, phone, password } = req.body;

//   try {
//     const userExists = await User.findOne({ $or: [{ email }, { phone }] });
//     if (userExists) return res.status(400).json({ message: 'Email or phone already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email, phone, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'Signup successful' });
//     console.log(req.body)
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//     console.log(req.body)
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//     res.status(200).json({ message: 'Login successful', user: { email: user.email, name: user.firstName } });
//     console.log(req.body)
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//     console.log(req.body)
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: 'Email or phone already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, phone, password: hashedPassword });
    await newUser.save();

    console.log("✅ New user signed up:", newUser.email);
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error("❌ Signup Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    console.log("✅ User logged in:", email);
    res.status(200).json({ message: 'Login successful', user: { email: user.email, name: user.firstName } });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
