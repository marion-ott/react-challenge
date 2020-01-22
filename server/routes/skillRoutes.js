const router = require('express').Router()
const skillController = require('./../controllers/skillController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(skillController.getSkills)
    .post(authController.checkLogIn, authController.protect, skillController.addSkill)
    
router
    .route('/:id')
    .get(skillController.getSkill)
    .patch(authController.checkLogIn, authController.protect, skillController.updateSkill)
    .delete(authController.checkLogIn, authController.protect, skillController.deleteSkill)

module.exports = router
