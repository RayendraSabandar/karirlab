const { Resume, Education, Achievement, Occupation, sequelize } = require('../models')
const { linkedInValidator, portfolioValidator } = require('../helpers/URLValidator');

class ResumeController {
	static async createNewResume(req, res, next) {
		try {
			const { 
				name,
				email,
				phone_number,
				linkedin_url,
				portfolio_url,
				occupations,
				educations,
				achievements,
			} = req.body


			const isValidLinkedinURL = linkedInValidator(linkedin_url)
			const isValidPortfolioURL = portfolioValidator(portfolio_url)

			if(isValidLinkedinURL && isValidPortfolioURL) {
				// Start transaction
				const result = await sequelize.transaction(async (t) => {
					// Create new resume
					const createdResume = await Resume.create({
						name,
						email,
						phone_number,
						linkedin_url,
						portfolio_url,
					}, { transaction: t });
					const resume_id = createdResume.id

					// Assign resume_id
					occupations.map(el => {
						el.resume_id = resume_id
						return el
					})

					educations.map(el => {
						el.resume_id = resume_id
						return el
					})

					const resumeAchievements = achievements.map(el => {
						const newArray = {
							name: el,
							type: 'Resume',
							resume_id
						}
		
						return newArray
					})

					// Create new occupations
					const createdOccupations = await Occupation.bulkCreate(occupations, { transaction: t })

					// Assign occupation id
					var occupationAchievements = []
					for(let i = 0; i < occupations.length; i++) {
						const eachOccupation = occupations[i]
						const occupation_id = createdOccupations[i].id
						const eachOccupationAchievements = eachOccupation.occupation_achievement.map(el => {
							const newArray = {
								name: el,
								type: 'Occupation',
								occupation_id
							}
							return newArray
						})
						occupationAchievements = [...occupationAchievements, ...eachOccupationAchievements]
					}
					
					// Create achievement array
					const achievementsData = [...resumeAchievements, ...occupationAchievements]

					// Create new achievements
					await Achievement.bulkCreate(achievementsData, { transaction: t })

					// Create new educations
					await Education.bulkCreate(educations, { transaction: t })
				
					return createdResume;
				});

				// Get associated/related data
				const completeResume = await Resume.findOne({
					where : {
						id: result.id
					},
					attributes: {
						exclude: [ 'createdAt', 'updatedAt']
					},
					include:[
						{
						  model: Occupation,
						  required: true,
						  attributes: {
							exclude: [ 'createdAt', 'updatedAt']
						  },
						  include: [
							{
							  model: Achievement,
							  required: true,
							  attributes: {
								exclude: [ 'createdAt', 'updatedAt']
							  },
							  where: {
								type: 'Occupation'
							  }
							},
						  ]
						},
						{
							model: Achievement,
							required: true,
							attributes: {
								exclude: [ 'createdAt', 'updatedAt']
							},
							where: {
								type: 'Resume'
							}
						},
						{
							model: Education,
							required: true,
							attributes: {
								exclude: [ 'createdAt', 'updatedAt']
							},
						}
					  ]
				})

				res.status(201).json({
					message: 'Successfully created a new resume',
					resume: completeResume
				})
			} else {
				const errorMessage = []
				if(!isValidLinkedinURL) {
					errorMessage.push('Must be a valid LinkedIn URL')
				}
				if (!isValidPortfolioURL) {
					errorMessage.push('Must be a valid Portfolio URL')
				}
				throw errorMessage
			}

		} catch (error) {
			if(error.name === 'SequelizeValidationError') {
				const arrayOfErrors = error.errors.map(el => {
					return el.message
				})
				res.status(400).json({
					message: "Failed to create new resume",
					error: arrayOfErrors
				})
			} else {
				res.status(400).json({
					message: "Failed to create new resume",
					error
				})
			}
		}	
	}
	static async getAllResumes(req, res, next) {
		try {
			const resumeList = await Resume.findAll({
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			})
			res.status(200).json({
				message: "Successfully get all resumes",
				resumeList
			})
		} catch (error) {
			console.log(error, 'error')
			res.status(500).json({
				message: "Failed to get resumes",
				error
			})
		}
  	}
}

module.exports = ResumeController