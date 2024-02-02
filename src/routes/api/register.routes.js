const exoress = require('express')
const bcrypt = require('bcrypt')

const { User } = require('../../../db/models/index')

const RegistrationAPIRouter = exoress.Router()

RegistrationAPIRouter.post('/register', async (req, res) => {
  const { login, password } = req.body
  if (!login || !password) {
    return res.status(400).json({ error: 'Не указан логин или пароль' })
  }
  try {
    const user = await User.findOne({ where: { login } })
    if (user) {
      res.status(400).json({ error: 'Вы уже были зарегистрированы ранее' })
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({ login, password: encryptedPassword })
      const { login: resultLogin } = newUser.get({ plain: true })
      res.status(201)
      res.json({ login: resultLogin })
    }
  } catch (error) {
    console.error('ERROR: ', error)
    res.status(500)
    res.json({ error: error.message })
  }
})

module.exports = RegistrationAPIRouter
