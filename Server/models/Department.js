const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  headId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'departments'
});

// Ensure table exists
Department.sync();

module.exports = Department;
