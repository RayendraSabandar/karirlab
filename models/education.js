'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Resume, { foreignKey: 'resume_id', as: 'educations', onDelete: 'cascade', onUpdate: 'cascade' })
    }
  };
  Education.init({
    education_name: DataTypes.STRING,
    education_degree: DataTypes.STRING,
    education_faculty: DataTypes.STRING,
    education_city: DataTypes.STRING,
    education_start:  {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Must enter a valid date format'
        }
      }
    },
    education_end:  {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Must enter a valid date format'
        }
      }
    },
    education_score: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          msg: 'Must enter a float number'
        },
        isBetweenZeroAndFour(score){
          if(score < 0 || score > 4) {
            throw new Error('Must enter a score between 0 and 4')
          }
        }
      }
    },
    resume_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};