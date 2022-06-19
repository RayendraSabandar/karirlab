const ResumeController = require('../controllers/resume')
const routes = require('express').Router()

// Create Resume
routes.post('/create-new-resume', ResumeController.createNewResume)
// List Resume
routes.get('/get-all-resumes', ResumeController.getAllResumes)

// Get Resume
routes.get('/find-one-resume/:resume_id', ResumeController.findOneResume)

// Update Resume
routes.put('/edit-one-resume/:resume_id', ResumeController.editOneResume)

// Delete Resume
routes.delete('/delete-one-resume/:resume_id', ResumeController.deleteOneResume)

module.exports = routes