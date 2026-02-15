const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
  type: {
    type: DataTypes.STRING, // e.g., "Physical", "Sexual", "Emotional"
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  latitude: {
    type: DataTypes.FLOAT,
  },
  longitude: {
    type: DataTypes.FLOAT,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Report;
