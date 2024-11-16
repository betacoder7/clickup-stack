'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workspaces extends Model {
    static associate(models) {
      this.belongsTo(models.users);

      this.hasMany(models.spaces);
      this.hasMany(models.tags);
    }
  }
  workspaces.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'workspaces',
  });
  return workspaces;
};