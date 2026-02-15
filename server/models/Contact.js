const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING, // e.g., "Friend", "Sister", "Helpline"
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Contact;
