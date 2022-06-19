const routes = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const resumeRoutes = require('./resumes')

routes.use('/resumes', resumeRoutes)

routes.use(errorHandler)

module.exports = routes