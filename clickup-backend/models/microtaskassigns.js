'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class microtaskassigns extends Model {
    static associate(models) {
      this.belongsTo(models.users);
      this.belongsTo(models.microtasks);
    }
  }
  microtaskassigns.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    microtaskId: { type: DataTypes.INTEGER, allowNull: false },
    uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  }, {
    sequelize,
    modelName: 'microtaskassigns',
  });
  return microtaskassigns;
};