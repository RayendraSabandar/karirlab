const ResumeController = require('../controllers/resume')

const routes = require('express').Router()

// Create Resume
// List Resume
routes.get('/get-all-resumes', ResumeController.getAllResumes)

// Get Resume

// Update Resume
// Create a middleware to go to specific services
// Delete Resume

module.exports = routes