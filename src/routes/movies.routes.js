const { Router } = require('express')

const MoviesController = require("../controllers/MoviesController")

const moviesRoutes = Router()

const moviesController = new MoviesController();

moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);

module.exports = moviesRoutes
