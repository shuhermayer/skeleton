const bcrypt = require('bcrypt')

const express = require('express')
const { Cards } = require('../../../db/models/index')

const CardsAPIRouter = express.Router()

CardsAPIRouter.get('/cards', async (req, res) => {
  const cards = await Cards.findAll()
  res.json(cards)
})

module.exports = CardsAPIRouter
