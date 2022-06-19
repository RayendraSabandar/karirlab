const ResumeController = require('../controllers/resume')
const errorHandler = require('../middlewares/errorHandler')
const routes = require('express').Router()

// Create Resume
routes.post('/create-new-resume', ResumeController.createNewResume)
// List Resume
routes.get('/get-all-resumes', ResumeController.getAllResumes)

// Get Resume
routes.get('/find-one-resume/:resume_id', ResumeController.findOneResume)

// Update Resume
// Create a middleware to go to specific services
routes.put('/edit-one-resume/:resume_id', ResumeController.editOneResume)

// Delete Resume
routes.delete('/delete-one-resume/:resume_id', ResumeController.deleteOneResume)

module.exports = routes