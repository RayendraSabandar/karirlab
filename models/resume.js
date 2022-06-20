'use strict';
const {
  	Model
} = require('sequelize');
const phoneNumberValidator = require('../helpers/validators/phoneNumberValidator');
const { linkedInValidator, portfolioValidator } = require('../helpers/validators/URLValidator');
module.exports = (sequelize, DataTypes) => {
	class Resume extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Resume.hasMany(models.Occupation, { foreignKey: 'resume_id', as: 'occupations', onDelete: 'cascade', onUpdate: 'cascade' })
			Resume.hasMany(models.Education, { foreignKey: 'resume_id', as: 'educations', onDelete: 'cascade', onUpdate: 'cascade' })
		}
	};
	Resume.init({
		name: {
		allowNull: false,
		type: DataTypes.STRING,
		validate : {
			notNull : {
				msg: 'Must enter a name'
			},
			notEmpty : {
				msg: 'Email cannot be empty'
			},
			
		}
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			validate : {
				notNull: {
					msg: 'Must enter an email address'
				},
				notEmpty : {
					msg: 'Email cannot be empty'
				},
				isEmail: {
					msg: 'Must enter a valid email address'
				}
			}
		},
		phone_number: {
			allowNull: false,
			type: DataTypes.STRING,
			validate : {
				notNull: {
					msg: 'Must enter a phone number'
				},
				notEmpty : {
					msg: 'Phone number cannot be empty'
				},
				isValidPhoneNumber(phoneNumber){
					phoneNumberValidator(phoneNumber)
				}
			}
		},
		linkedin_url: {
			type: DataTypes.STRING,
			validate: {
				isValidURL(linkedin_url) {
					linkedInValidator(linkedin_url)
				}
			}
		},
		portfolio_url: {
			type: DataTypes.STRING,
			validate: {
				isValidURL(portfolio_url) {
					portfolioValidator(portfolio_url)
				}
			}
		},
		achievements: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
	}, {
		sequelize,
		modelName: 'Resume',
	});
	return Resume;
};