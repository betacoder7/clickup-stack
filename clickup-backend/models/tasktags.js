'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasktags extends Model {
    static associate(models) {
      this.belongsTo(models.tags);
      this.belongsTo(models.tasks);
    }
  }
  tasktags.init({
    tagId: { type: DataTypes.INTEGER, allowNull: false },
    taskId: { type: DataTypes.INTEGER, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 }
  }, {
    sequelize,
    modelName: 'tasktags',
  });
  return tasktags;
};