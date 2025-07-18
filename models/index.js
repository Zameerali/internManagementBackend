
const { sequelize, DataTypes } = require('../config/db.config');
const Intern = require('./internModel')
const Profile = require('./profileModel')
const InternProject = require('./internProjectModel')
const ProjectHistory = require('./projectHistoryModel')
const Task = require('./taskModel')
const Project = require('./projectModel')

Intern.hasOne(Profile, { foreignKey: 'intern_id' });
Profile.belongsTo(Intern, { foreignKey: 'intern_id' });

InternProject.belongsTo(Intern, { foreignKey: 'intern_id' });
InternProject.belongsTo(Project, { foreignKey: 'project_id' });

Project.hasMany(InternProject, { foreignKey: 'project_id' });
Intern.hasMany(InternProject, { foreignKey: 'intern_id' });

Intern.belongsToMany(Project, { through: InternProject, foreignKey: 'intern_id' });
Project.belongsToMany(Intern, { through: InternProject, foreignKey: 'project_id' });

ProjectHistory.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(ProjectHistory, { foreignKey: 'project_id' });
Intern.hasMany(ProjectHistory, { foreignKey: 'intern_id' });

Task.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(Task, { foreignKey: 'project_id' });

Task.belongsTo(Intern, { foreignKey: 'intern_id' });
Intern.hasMany(Task, { foreignKey: 'intern_id' });


module.exports = {
  sequelize,
  Intern,
  Profile,
  InternProject,
  ProjectHistory,
  Task,
  Project
};
