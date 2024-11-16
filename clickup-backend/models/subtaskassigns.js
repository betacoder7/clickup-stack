'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subtaskassigns extends Model {
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.subtasks);
    }
  }
  subtaskassigns.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    subtaskId: { type: DataTypes.INTEGER, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'subtaskassigns',
  });
  return subtaskassigns;
};