const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AttendanceHistory = sequelize.define('AttendanceHistory', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  present: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'attendance_history'
});

AttendanceHistory.sync();

module.exports = AttendanceHistory;
