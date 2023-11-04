const { hash, compare } = require('bcryptjs');

const AppError = require("../utils/appError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection();
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUsersExists) {
      throw new AppError("Este email já está em uso.")
      }

    const hashedPassword = await hash(password, 8)    
    
    
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]
    )


    return response.status(201).json() 
  }
}

module.exports = UsersController
