const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const jobsController = require('../controllers/jobsController')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.post('/postJob', jobsController.postJob);
router.get('/userJobs/:userId', jobsController.getUserJobs);
module.exports = router
