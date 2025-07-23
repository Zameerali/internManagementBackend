const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const UserProfile = sequelize.define('UserProfile', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, allowNull: false },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  bio: { type: DataTypes.TEXT, allowNull: false },
  pic_url: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.STRING(15), allowNull: false },
}, {
  tableName: 'user_profile',
  timestamps: false
});

module.exports = UserProfile;