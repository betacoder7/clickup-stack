'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class microtasks extends Model {
    static associate(models) {
      this.belongsTo(models.subtasks);

      this.belongsToMany(models.users, {
        through: "microtaskassigns",
        as: "assignees",
      });
    }
  }
  microtasks.init({
    subtaskId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "TODO" },
    name: { type: DataTypes.STRING, allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: true },
    timeTracked: { type: DataTypes.STRING, allowNull: true },
    timeEstimate: { type: DataTypes.STRING, allowNull: true },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'microtasks',
  });
  return microtasks;
};