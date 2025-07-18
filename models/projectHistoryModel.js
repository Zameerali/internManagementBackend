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
  intern_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  action: {
    type: DataTypes.STRING(50),
    allowNull: false
    },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'project_history',
  timestamps: false
});

module.exports = ProjectHistory;
