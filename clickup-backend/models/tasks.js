'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    static associate(models) {
      this.belongsTo(models.lists);

      this.hasMany(models.subtasks);
      this.hasMany(models.taskfiles);
      this.hasMany(models.checklists);

      this.belongsToMany(models.tags, {
        through: "tasktags",
        as: "tags"
      });
      this.belongsToMany(models.users, {
        through: "taskassigns",
        as: "assignees",
      });
    }
  }
  tasks.init({
    listId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "TODO" },
    name: { type: DataTypes.STRING, allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: true },
    // timeTracked: { type: DataTypes.STRING, allowNull: true },
    timeEstimate: { type: DataTypes.STRING, allowNull: true },
    // totalTime: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};

