const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware'); // optional auth

// Minimal route for testing
router.get('/employees', protect, reportController.getEmployeeReports);

// Monthly attendance aggregation: query params ?year=YYYY&month=MM
router.get('/monthly', protect, reportController.getMonthlyAttendanceReport);

module.exports = router;
