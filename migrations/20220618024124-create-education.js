'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      education_name: {
        type: Sequelize.STRING
      },
      education_degree: {
        type: Sequelize.STRING
      },
      education_faculty: {
        type: Sequelize.STRING
      },
      education_city: {
        type: Sequelize.STRING
      },
      education_start: {
        type: Sequelize.DATE
      },
      education_end: {
        type: Sequelize.DATE
      },
      education_score: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Education');
  }
};