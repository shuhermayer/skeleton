const express = require('express')
const { Cards } = require('../../../db/models/index')

const CardsAPIRouter = express.Router()

// пока не используется
CardsAPIRouter.get('/cards', async (req, res) => {
  const cards = await Cards.findAll()
  res.json(cards)
})

module.exports = CardsAPIRouter
