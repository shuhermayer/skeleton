const bcrypt = require('bcrypt')

const express = require('express')
const { User } = require('../../../db/models/index')

const LoginAPIRouter = express.Router()

LoginAPIRouter.post('/login', async (req, res) => {
  const { login, password } = req.body
  if (!login || !password) {
    return res.status(400).json({ error: 'Не указан логин или пароль' })
  }
  try {
    const user = await User.findOne({ where: { login }, raw: true })
    if (!user) {
      return res.status(400).json({ error: 'Неверный пароль' })
    }
    const isSame = await bcrypt.compare(password, user.password)
    if (isSame) {
      const { password: userPass, ...userWithoutPassword } = user
      req.session.user = userWithoutPassword
      res.status(200)
      res.json(userWithoutPassword)
    }
  } catch (error) {
    console.error('error: ', error)
    res.status(500)
    res.json({ error: error.message })
  }
})

LoginAPIRouter.delete('/login', async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('error: ', err)
      return next(err)
    }
    res.clearCookie('user_sid')
    return res.json({ error: 'Сессия удалена' })
  })
})

module.exports = LoginAPIRouter
