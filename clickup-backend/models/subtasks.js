'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subtasks extends Model {
    static associate(models) {
      this.belongsTo(models.tasks);

      this.hasMany(models.microtasks);

      this.belongsToMany(models.tags, {
        through: "subtasktags",
        as: "tags"
      });

      this.belongsToMany(models.users, {
        through: "subtaskassigns",
        as: "assignees",
      });
    }
  }
  subtasks.init({
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "TODO" },
    description: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: true },
    timeTracked: { type: DataTypes.STRING, allowNull: true },
    timeEstimate: { type: DataTypes.STRING, allowNull: true },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'subtasks',
  });
  return subtasks;
};