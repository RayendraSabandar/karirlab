const routes = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const resumeRoutes = require('./resumes')
const educationRoutes = require('./educations')

routes.use('/resumes', resumeRoutes)
routes.use('/educations', educationRoutes)

routes.use(errorHandler)

module.exports = routes