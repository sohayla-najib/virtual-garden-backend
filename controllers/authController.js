const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    // Generate a verification token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // (Assuming you send email elsewhere here)
    res.status(201).json({ message: "User registered successfully. Verification email sent.", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Sign JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add and export the verifyEmail function
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // Expecting the token in the query string
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Mark the user's email as verified (ensure your User model has an 'emailVerified' field)
    user.emailVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Debug: Check exports
console.log("Auth Controller Loaded", { 
  register: exports.register, 
  login: exports.login,
  verifyEmail: exports.verifyEmail 
});
