'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class folders extends Model {
    static associate(models) {
      this.belongsTo(models.spaces);

      this.hasMany(models.lists);
    }
  }
  folders.init({
    spaceId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  },
    {
      sequelize,
      modelName: 'folders',
    });
  return folders;
};  