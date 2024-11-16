'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    static associate(models) {
      this.belongsTo(models.workspaces);
    }
  }
  tags.init({
    workspaceId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    textColor: { type: DataTypes.STRING, allowNull: false },
    backgroundColor: { type: DataTypes.STRING, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'tags',
  });
  return tags;
};
