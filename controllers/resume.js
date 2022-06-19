const { Resume } = require('../models')

class ResumeController {
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