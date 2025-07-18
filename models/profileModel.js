const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  intern_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  linkedin: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'profiles',
  timestamps: false
});

module.exports = Profile;

// const db = require('../config/db.config.js');

// module.exports = {
//   getProfileByInternId: async (intern_id) => {
//     const [rows] = await db.query('SELECT * FROM profiles WHERE intern_id = ?', [intern_id]);
//     return rows;
//   },
//     createProfile: async (intern_id, { bio, linkedin }) => {
//     const [result] = await db.query(
//       'INSERT INTO profiles (intern_id, bio, linkedin) VALUES (?, ?, ?)',
//       [intern_id, bio, linkedin]
//     );
//     return { intern_id, bio, linkedin };
//   },
// };
