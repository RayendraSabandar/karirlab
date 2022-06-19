'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Occupations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      occupation_position: {
        type: Sequelize.STRING
      },
      occupation_start: {
        type: Sequelize.DATE
      },
      occupation_end: {
        type: Sequelize.DATE
      },
      occupation_status: {
        type: Sequelize.STRING
      },
      resume_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Resumes',
          key: 'id'
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Occupations');
  }
};