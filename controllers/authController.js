const { User,UserProfile } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password, role, first_name, last_name, phone, bio, image_url } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 10);
    const userRole = (role === "admin" || role === "student") ? role : "student";
    const user = await User.create({ email, password: hash, role: userRole });
    await UserProfile.create({
      user_id: user.id,
      first_name,
      last_name,
      bio,
      phone,
      image_url
    });
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    if (!token) {
      throw new Error('Failed to generate JWT token');
    }
    res.cookie('jwt', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, 
    });
    res.json({ message: 'Login successful' });
    // const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    // res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logout successful' });
};
exports.checkAuth = async (req, res) => {
  const token = req.cookies.jwt;
  // console.log('Check-auth JWT:', token);
  if (!token) return res.json({ isAuthenticated: false });
  try {
    if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('Check-auth decoded:', decoded);
    res.json({ isAuthenticated: true });
  } catch (err) {
    console.error('Check-auth error:', err.message);
    res.json({ isAuthenticated: false });
  }
};

exports.checkEmailExists = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (err) {
    console.error('Check-email-exists error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};