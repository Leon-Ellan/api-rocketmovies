const { Router } = require('express')

const MoviesController = require("../controllers/MoviesController")

const moviesRoutes = Router()

const moviesControllers = new MoviesController();


moviesRoutes.post("/:user_id", moviesControllers.create)


module.exports = moviesRoutes
