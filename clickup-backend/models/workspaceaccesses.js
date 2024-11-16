'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workspaceAccesses extends Model {
    static associate(models) {
      this.belongsTo(models.workspaces);
      this.belongsTo(models.users);
    }
  }
  workspaceAccesses.init({
    workspaceId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    isAdmin: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 }
  }, {
    sequelize,
    modelName: 'workspaceAccesses',
  });
  return workspaceAccesses;
};