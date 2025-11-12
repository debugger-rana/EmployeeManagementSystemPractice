const User = require('../models/User');
const Attendance = require('../models/Attendance');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

// Get all employees (for testing / compatibility)
exports.getEmployeeReports = async (req, res) => {
  try {
    const employees = await User.findAll({
      where: { role: 'Employee' }, // only employees
      attributes: ['id', 'name', 'email', 'role'] // minimal fields
    });

    res.status(200).json({ success: true, data: employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/reports/monthly?year=2025&month=11
// Returns per-employee present/absent counts for the given month
exports.getMonthlyAttendanceReport = async (req, res) => {
  try {
    const now = new Date();
    const year = parseInt(req.query.year, 10) || now.getFullYear();
    const month = parseInt(req.query.month, 10) || (now.getMonth() + 1); // 1-12

    // compute start and end dates for the month
    const start = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    // SQL that aggregates present/absent counts per user within date range
    const sql = `
      SELECT u.id as userId, u.name,
        COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) AS presentCount,
        COALESCE(SUM(CASE WHEN a.status != 'present' AND a.status IS NOT NULL THEN 1 ELSE 0 END), 0) AS absentCount
      FROM users u
      LEFT JOIN attendance a
        ON a.userId = u.id AND a.date BETWEEN :start AND :end
      WHERE u.role = 'Employee'
      GROUP BY u.id, u.name
      ORDER BY u.name;
    `;

    const results = await sequelize.query(sql, {
      replacements: { start, end },
      type: QueryTypes.SELECT
    });

    // Convert numeric strings to numbers (some dialects return strings)
    const data = results.map((r) => ({
      userId: r.userId,
      name: r.name,
      present: Number(r.presentCount || 0),
      absent: Number(r.absentCount || 0)
    }));

    res.status(200).json({ success: true, data, month: { year, month, start, end } });
  } catch (err) {
    console.error('getMonthlyAttendanceReport error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
