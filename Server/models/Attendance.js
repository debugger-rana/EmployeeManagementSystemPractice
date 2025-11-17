const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  present: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  tableName: 'attendance'
});

Attendance.sync();

module.exports = Attendance;
