const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(authController.checkLogIn, userController.getAllUsers)

router
    .route('/signup')
    .post(authController.signup)

router
    .route('/login')
    .post(authController.login)

router
    .route('/add-user')
    .post(authController.checkLogIn, authController.protect, userController.createUser)
    
router
    .route('/:id')
    .get(authController.checkLogIn, userController.getUser)
    .patch(authController.checkLogIn, userController.updateUser)
    .delete(authController.checkLogIn, authController.protect, userController.deleteUser)    

module.exports = router;
