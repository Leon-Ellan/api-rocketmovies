const { Router } = require('express')

const UsersController = require("../controllers/UsersControllers")

const usersRoutes = Router()
const usersControllers = new UsersController

usersRoutes.post('/', usersControllers.create)

module.exports = usersRoutes
