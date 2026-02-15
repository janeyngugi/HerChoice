const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Story = sequelize.define('Story', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorAlias: {
    type: DataTypes.STRING,
    defaultValue: 'Anonymous',
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Moderation flag
  },
});

module.exports = Story;
