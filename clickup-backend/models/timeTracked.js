'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class timeTrackeds extends Model {
        static associate(models) {
            this.belongsTo(models.tasks);
        }
    }
    timeTrackeds.init({
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalDuration: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0h 0m",
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        }
    }, {
        sequelize,
        modelName: 'timeTrackeds',
    });
    return timeTrackeds;

};