const express = require('express')

const Router = express.Router();

const {registerUserController,loginUserController,logoutUserController,getUserController} = require("../controllers/userController")

const {protect} = require("../middleware/authMiddleware")

Router.post('/register',registerUserController)


Router.post('/login',loginUserController)


Router.get("/logout",logoutUserController);


Router.get("/getUser",protect,getUserController)

module.exports = Router;