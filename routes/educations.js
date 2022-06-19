const ResumeController = require('../controllers/resume')
const routes = require('express').Router()

// Create Education

// Update Education
routes.put('/edit-one-resume/:resume_id', ResumeController.editOneResume)

// Delete Education

module.exports = routes