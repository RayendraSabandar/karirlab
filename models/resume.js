'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resume.hasMany(models.Occupation, { foreignKey: 'resume_id' })
      Resume.hasMany(models.Education, { foreignKey: 'resume_id' })
    }
  };
  Resume.init({
    name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Must enter a name'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Must enter an email'
        },
        isEmail: {
          msg: 'Must be a valid email'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Must enter a phone number'
        },
        isValidPhoneNumber(phoneNumber) {
          const plussixtwo = /^\(+\)?([62]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
          const zeroeight = /^\(?([0]{1})\)?[-. ]?([0-9]{3})[- ]?(\d{4})[- ]?(\d{4})$/
          if(!plussixtwo.test(phoneNumber) && !zeroeight.test(phoneNumber)) {
            throw new Error('Phone number must start with +62 or 0');
          } 
        }
      }
    },
    linkedin_url: DataTypes.STRING,
    portofolio_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Resume',
  });
  return Resume;
};