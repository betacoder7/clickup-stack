'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskfiles extends Model {
    static associate(models) {
      this.belongsTo(models.tasks);
    }
  }
  taskfiles.init({
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 }
  }, {
    sequelize,
    modelName: 'taskfiles',
  });
  return taskfiles;
};