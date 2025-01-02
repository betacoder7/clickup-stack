'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class subtasktags extends Model {
        static associate(models) {
            this.belongsTo(models.tags);
            this.belongsTo(models.subtasks);
        }
    }

    subtasktags.init({
        tagId: { type: DataTypes.INTEGER, allowNull: false },
        subtaskId: { type: DataTypes.INTEGER, allowNull: false },
        uuid: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 }
    }, {
        sequelize, modelName: 'subtasktags',
    });
    return subtasktags;
};



