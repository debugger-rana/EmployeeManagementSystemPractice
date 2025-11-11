const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const cron = require('node-cron');
const Attendance = require('./models/Attendance');
const AttendanceHistory = require('./models/AttendanceHistory');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/departments', departmentRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'HRMS Lite API is running...',
    endpoints: {
      auth: '/api/auth',
      register: '/api/auth/register',
      login: '/api/auth/login'
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 Authentication: http://localhost:${PORT}/api/auth`);
});

// Daily rollover job: move present records to history and reset today's attendance to absent
try {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running attendance rollover...');
    try {
      const today = new Date().toISOString().slice(0,10);
      const presents = await Attendance.findAll({ where: { date: today, status: 'present' } });
      for (const p of presents) {
        await AttendanceHistory.create({ userId: p.userId, status: 'present', time: p.time, date: p.date });
      }
      // Reset or ensure attendance rows exist and are absent for next day
      await Attendance.update({ status: 'absent', time: null }, { where: { date: today } });
      console.log('Attendance rollover complete.');
    } catch (err) {
      console.error('Rollover error:', err);
    }
  });
} catch (err) {
  console.warn('node-cron not available or scheduling failed. Install node-cron to enable daily rollover.');
}