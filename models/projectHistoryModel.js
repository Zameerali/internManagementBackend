const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ProjectHistory = sequelize.define('ProjectHistory', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'projecthistory',
  timestamps: false
});

module.exports = ProjectHistory;
