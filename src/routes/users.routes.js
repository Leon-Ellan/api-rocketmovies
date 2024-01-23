const { Router } = require('express')

const UsersController = require("../controllers/UsersControllers")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const usersRoutes = Router()
const usersControllers = new UsersController

usersRoutes.post('/', usersControllers.create);
usersRoutes.put('/', ensureAuthenticated, usersControllers.update);


module.exports = usersRoutes
