const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Attendance = require('../models/Attendance');
const AttendanceHistory = require('../models/AttendanceHistory');
const User = require('../models/User');
const { requireAdmin } = require('../middleware/roleMiddleware');

// helper protect (lightweight) - duplicates authRoutes protect logic
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_123');
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

// Get current user's attendance for today
router.get('/me', protect, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    let record = await Attendance.findOne({ where: { userId: req.user.id, date: today } });
    if (!record) {
      record = await Attendance.create({ userId: req.user.id, present: false, date: today });
    }
    // Return attendance plus user's name/email so client can render reliably
    res.json({ success: true, data: {
      userId: record.userId,
      present: record.present,
      time: record.time,
      date: record.date,
      name: req.user.name,
      email: req.user.email
    } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: list today's attendance for all users
router.get('/', protect, requireAdmin, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { sequelize } = require('../config/database');
    // Use LEFT JOIN to include all users even if they don't have an attendance row for today.
    // If no attendance row exists, treat as not present (false).
    const rows = await sequelize.query(
      `SELECT u.id AS userId, u.name, u.email, COALESCE(a.present, 0) AS present, a.time
       FROM users u
       LEFT JOIN attendance a ON a.userId = u.id AND a.date = :today
       ORDER BY u.name ASC`,
      { replacements: { today }, type: sequelize.QueryTypes.SELECT }
    );

    // Normalize rows to a consistent shape
    const normalized = (rows || []).map(r => ({
      userId: r.userId ?? r.id,
      name: r.name ?? null,
      email: r.email ?? null,
      present: Boolean(r.present),
      time: r.time ?? null
    }));

    res.json({ success: true, data: normalized });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: mark present/absent for a user (use boolean `present` in request body)
router.patch('/:userId', protect, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { present } = req.body; // boolean
    if (typeof present !== 'boolean') return res.status(400).json({ success: false, message: 'Invalid present flag; expected boolean' });
    const today = new Date().toISOString().slice(0, 10);
    let record = await Attendance.findOne({ where: { userId, date: today } });
    const time = present ? new Date().toLocaleTimeString() : null;
    if (!record) {
      record = await Attendance.create({ userId, present, time, date: today });
    } else {
      record.present = present;
      record.time = time;
      await record.save();
    }
    // Fetch user name/email to return a consistent payload
    const user = await User.findByPk(userId);
    res.json({ success: true, data: {
      userId: record.userId,
      present: Boolean(record.present),
      time: record.time,
      date: record.date,
      name: user ? user.name : null,
      email: user ? user.email : null
    } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get attendance history for current user
router.get('/history/me', protect, async (req, res) => {
  try {
    const rows = await AttendanceHistory.findAll({ where: { userId: req.user.id }, order: [['date','DESC']] });
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
