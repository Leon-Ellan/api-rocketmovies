const knex = require("../database/knex")

class MoviesControllers {
  async create (request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params;

let intRating = parseInt(rating)

if (intRating == 0 || intRating) {
    if (intRating < 1 || intRating > 5){
      return response.status(400).json({error: "Rating must be from 1 to 5."})
    }
}

const [movies_id] = await knex("movies_notes").insert({
  title,
  description,
  rating,
  user_id
});

    const tagsInsert = tags.map(name => {
      return {
        movies_id,
        name,
        user_id
      }
    })

    await knex("movies_tags").insert(tagsInsert)

  return response.json()

  }
}
module.exports = MoviesControllers
