const editChild = require('../helpers/loops/editChild');
const updateLoops = require('../helpers/loops/editChild');
const { Resume, Education, Occupation, sequelize } = require('../models')
const attributes = {
	exclude: [ 'createdAt', 'updatedAt']
}
const include = [
	{
		as: 'occupations',
		model: Occupation,
		attributes,
	},
	{
		as: 'educations',
		model: Education,
		attributes,
	}
]
const findByPkQuery = {
	attributes,
	include
}

class ResumeController {
	static async createNewResume(req, res, next) {
		try {
			const { 
				occupations,
				educations,
			} = req.body

			// Start transaction
			const result = await sequelize.transaction(async (t) => {
				const transaction = {
					transaction: t,
					validate: true
				}
				// Create new resume
				const createdResume = await Resume.create(req.body, transaction);
				const resume_id = createdResume.id

				if(occupations) {
					occupations.map(el => {
						el.resume_id = resume_id
						return el
					})

					// Create new occupations
					await Occupation.bulkCreate(occupations, transaction)

				}

				if(educations) {
					educations.map(el => {
						el.resume_id = resume_id
						return el
					
					})
					// Create new educations
					await Education.bulkCreate(educations, transaction)
				}

				return createdResume;
			});

			// Get associated/related data
			const completeResume = await Resume.findByPk(result.id, findByPkQuery)

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
				attributes,
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
			const foundResume = await Resume.findByPk(resume_id, findByPkQuery)

			if(!foundResume) {
				return res.status(200).json({
					message: "Resume not found",
				})
			}

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
				attributes,
				include: [
					{
						as: 'occupations',
						model: Occupation,
						attributes: [id]
					},
					{
						as: 'educations',
						model: Education,
						attributes: [id]
					}
				]
			})
			console.log(resume_id)
			console.log(foundResume)

			if(!foundResume) {
				res.status(404).json({
					message: 'Resume not found'
				})
			} else {
				const result = await sequelize.transaction(async (t) => {
					const updatedResume = await Resume.update({
						name,
						email,
						phone_number,
						linkedin_url,
						portfolio_url,
						achievements,
					}, {
						returning: true,
						where: {
							id: resume_id
						},
						transaction: t
					});

					await editChild(foundResume, Occupation, occupations, Education, educations, t, resume_id)

					return updatedResume
				})

				const completeResume = await Resume.findByPk(result[1][0].id, {
					attributes,
					include
				})
				res.status(200).json({
					message: 'Successfully edited one resume',
					resume: completeResume
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