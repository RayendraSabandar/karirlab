const ResumeController = require('../controllers/resume')
const routes = require('express').Router()

routes.post('/create-new-resume', ResumeController.createNewResume)
routes.get('/get-all-resumes', ResumeController.getAllResumes)
routes.get('/find-one-resume/:resume_id', ResumeController.findOneResume)
routes.put('/edit-one-resume/:resume_id', ResumeController.editOneResume)
routes.delete('/delete-one-resume/:resume_id', ResumeController.deleteOneResume)

module.exports = routes