'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.hasMany(models.workspaces, {
        as: "myWorkspaces",
      });

      this.belongsToMany(models.workspaces, {
        through: "workspaceAccesses",
        as: "workspaces",
      });
      this.belongsToMany(models.tasks, {
        through: "taskassigns",
        as: "assignedTasks",
      });
      this.belongsToMany(models.subtasks, {
        through: "subtaskassigns",
        as: "assignedSubTasks",
      });
      this.belongsToMany(models.microtasks, {
        through: "microtaskassigns",
        as: "assignedMicroTasks",
      });
    }
  }
  users.init({
    fullName: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};