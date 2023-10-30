const { Router } = require('express')

const UsersController = require("../controllers/UsersControllers")
 
const usersControllers = new UsersController

const usersRoutes = Router()


usersRoutes.post('/', usersControllers.create)

module.exports = usersRoutes
