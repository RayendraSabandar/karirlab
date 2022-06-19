const EducationController = require('../controllers/education')
const routes = require('express').Router()

// Create Education

// Update Education
routes.put('/edit-one-education/:education_id', EducationController.editOneEducation)

// Delete Education

module.exports = routes