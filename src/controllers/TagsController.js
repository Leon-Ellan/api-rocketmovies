const knex = require("../database/knex")

class TagsController { 
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("movies_tags")
    .where({ user_id })
    .groupBy("name")
    return response.json(tags)
  }
}

module.exports = TagsController