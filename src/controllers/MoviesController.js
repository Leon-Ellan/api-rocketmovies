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
  async show(request, response) {
    const { id } = request.params

    const movies = await knex("movies_notes").where({ id }).first()

    const tags = await knex("movies_tags").where({ movies_id: id }).orderBy("name")
    
    return response.json({
      ...movies,
      tags,
    })
  }
  async delete(request, response) {
    const { id } = request.params

    await knex("movies_notes").where({ id }).delete();

    return response.json("Deleted");
  }

  async index(request,response) {
    const { user_id, title, tags } = request.query;

    let movies_notes;
    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim()) // essa linha cria um vetor com as tags a partir da virgula 
      movies_notes = await knex("movies_tags")
      .select([
        "movies_notes.id",
        "movies_notes.title",
        "movies_notes.user_id",
      ])
      .where("movies_notes.user_id", user_id)
      .whereLike("movies_notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("movies_notes", "movies_notes.id", "movies_tags.movies_id")
      .groupBy("movies_notes.id")
      .orderBy("movies_notes.title")
      
    } else {
      movies_notes= await knex("movies_notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userTags = await knex("movies_tags").where({ user_id });
    const notesWithTags = movies_notes.map(note => {
      const noteTags = userTags.filter(tag => tag.movies_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    })


    return response.json(notesWithTags)
  }
}

  
module.exports = MoviesControllers
