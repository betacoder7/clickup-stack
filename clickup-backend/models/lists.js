'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lists extends Model {
    static associate(models) {
      this.belongsTo(models.folders);

      this.hasMany(models.tasks);
    }
  }
  lists.init({
    folderId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'lists',
  });
  return lists;
};