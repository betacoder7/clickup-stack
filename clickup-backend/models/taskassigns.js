'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskassigns extends Model {
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.tasks);
    }
  }
  taskassigns.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 }
  }, {
    sequelize,
    modelName: 'taskassigns',
  });
  return taskassigns;
};