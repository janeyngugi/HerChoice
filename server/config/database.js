const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'), // Store in root or server root
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
