const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const router = new express.Router()
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')
//register : http://localhost:3000/register

router.post('/register',userController.registerController)
//login http://localhost:3000/login

router.post('/login',userController.loginController)

//addproject http://localhost:3000/addproject

router.post('/addproject',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)

//homepage  http://localhost:3000/homeproject
router.get('/homeproject',projectController.homePageController)

// allproject :http://localhost:3000/allproject
router.get('/allproject',jwtMiddleware,projectController.allProjectController)

//userproject :http://localhost:3000/userproject
router.get('/userproject',jwtMiddleware,projectController.userProjectController)

//projects/10/edit : http://localhost:3000/projects/id/edit
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editProjectController)
 //projects/10/edit : http://localhost:3000/projects/id/remove

router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

router.put('/edit-user',jwtMiddleware,multerMiddleware.single('profilepic'),userController.editUserController)


module.exports = router 