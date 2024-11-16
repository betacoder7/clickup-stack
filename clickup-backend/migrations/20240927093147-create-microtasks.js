'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('microtasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subtaskId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dueDate: {
        type: Sequelize.DATE
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      timeTracked: {
        type: Sequelize.STRING
      },
      timeEstimate: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('microtasks');
  }
};