const { Education, sequelize } = require('../models')

class EducationController {
    static async editOneEducation(req, res, next) {
        try {
            const { education_id } = req.params
            const foundEducation = await Education.findByPk(education_id, {
				attributes: {
					exclude: [ 'createdAt', 'updatedAt']
				},
			})

            if(!foundEducation) {
				res.status(404).json({
					message: 'Resume not found'
				})
			} else {
                const { id } = foundEducation
                const {
                    education_name,
                    education_degree,
                    education_faculty,
                    education_city,
                    education_start,
                    education_end,
                    education_score
                } = req.body

                const updatedEducation = await Education.update({
                    education_name,
                    education_degree,
                    education_faculty,
                    education_city,
                    education_start,
                    education_end,
                    education_score
                },{
                    returning: true,
                    where: {
                        id
                    }
                })

                res.status(200).json({
					message: 'Successfully edited one resume',
					resume: updatedEducation
				})
            }
        } catch (error) {
            res.message = 'Failed to edit one education'
			next(error)
        }
    }
}

module.exports = EducationController