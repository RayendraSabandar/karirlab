const { Resume, Education, Achievement, Occupation, sequelize } = require('../models')

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

			// Start transaction
			const result = await sequelize.transaction(async (t) => {
				// Create new resume
				const createdResume = await Resume.create({
					name,
					email,
					phone_number,
					linkedin_url,
					portfolio_url,
					achievements
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

				// Create new occupations
				await Occupation.bulkCreate(occupations, { transaction: t })

				// Create new educations
				await Education.bulkCreate(educations, { transaction: t, validate: true })
			
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
						as: 'occupations',
						model: Occupation,
						required: true,
						attributes: {
						exclude: [ 'createdAt', 'updatedAt']
						},
					},
					{
						as: 'educations',
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

		} catch (error) {
			res.message = "Failed to create new resume"
			next(error)
		}	
	}
	static async getAllResumes(req, res, next) {
		try {
			const resumeList = await Resume.findAll({
				attributes: {
					exclude: [ 'createdAt', 'updatedAt']
				},
			})
			res.status(200).json({
				message: "Successfully get all resumes",
				resumeList
			})
		} catch (error) {
			res.message = "Failed to get resumes"
			next(error)
		}
  	}

	static async findOneResume(req, res, next) {
		try {
			const { resume_id }= req.params
			const foundResume = await Resume.findByPk(resume_id, {
				attributes: {
					exclude: [ 'createdAt', 'updatedAt']
				},
				include:[
					{
						as: 'occupations',
						model: Occupation,
						required: true,
						attributes: {
							exclude: [ 'createdAt', 'updatedAt']
					 	},
						include: [
							{
							as: 'occupation_achievements',
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
						as: 'achievements',
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
						as: 'educations',
						model: Education,
						required: true,
						attributes: {
							exclude: [ 'createdAt', 'updatedAt']
						},
					}
				]
			})

			res.status(200).json({
				message: "Successfully found one resume",
				resume: foundResume
			})
		} catch (error) {
			res.message = 'Failed to find one resume'
			next(error)
		}
	}

	static async editOneResume(req, res, next) {
		try {
			const { resume_id } = req.params
			const id = 'id'
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


			const foundResume = await Resume.findByPk(resume_id, {
				attributes: {
					exclude: [ 'createdAt', 'updatedAt']
				},
				include:[
					{
						as: 'occupations',
						model: Occupation,
						required: true,
						attributes: [id],
						include: [
							{
							as: 'occupation_achievements',
							model: Achievement,
							required: true,
							attributes: [id],
							where: {
								type: 'Occupation'
							}
							},
						]
					},
					{
						as: 'achievements',
						model: Achievement,
						required: true,
						attributes: [id],
						where: {
							type: 'Resume'
						}
					},
					{
						as: 'educations',
						model: Education,
						required: true,
						attributes: [id],
					}
				]
			})

			if(!foundResume) {
				res.status(404).json({
					message: 'Resume not found'
				})
			} else {
				const { achievements, occupations } = foundResume
				let occupationAchievements = []
				occupations.forEach(element => {
					occupationAchievements = [...occupationAchievements, ...element.occupation_achievements]
				});
				const achievementsData = [...achievements, ...occupationAchievements]
				res.status(200).json({
					message: 'Successfully edited one resume',
					resume: achievementsData
				})
			}
		} catch (error) {
			res.message = 'Failed to edit one resume'
			next(error)
		}
	}

	static async deleteOneResume(req, res, next){
		try {
			const { resume_id } = req.params
			const foundResume = await Resume.findByPk(resume_id)

			if(!foundResume) {
				res.status(404).json({
					message: 'Resume not found'
				})
			} else {
				await Resume.destroy({
					where: {
						id: resume_id
					}
				})
			}

			res.status(200).json({
				message: 'Successfully deleted one resume',
			})
		} catch (error) {
			res.message = 'Failed to delete one resume'
			next(error)
		}
	}
}

module.exports = ResumeController