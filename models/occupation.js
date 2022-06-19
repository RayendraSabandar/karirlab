'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Occupation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Occupation.belongsTo(models.Resume, { foreignKey: 'resume_id', as: 'occupations', onDelete: 'cascade', onUpdate: 'cascade' })
    }
  };
  Occupation.init({
    company_name: DataTypes.STRING,
    occupation_position: DataTypes.STRING,
    occupation_start: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Must enter a valid date format'
        }
      }
    },
    occupation_end: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Must enter a valid date format'
        }
      }
    },
    occupation_status: DataTypes.STRING,
    occupation_achievement: DataTypes.ARRAY(DataTypes.STRING),
    resume_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Occupation',
  });
  return Occupation;
};