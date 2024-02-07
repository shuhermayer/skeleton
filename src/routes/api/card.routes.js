const CardAPIRouter = require('express').Router()
const { Cards } = require('../../../db/models/index')

CardAPIRouter.put('/card/:id', async (req, res) => {
  const cardId = req.params.id
  const { title, description, image } = req.body

  try {
    const card = await Cards.findOne({
      where: {
        id: cardId,
        userId: req.session.user.id,
      },
    })
    if (!card) {
      return res.status(404).json({ error: 'Не найдено' })
    }
    await card.update({
      title: title || null,
      description: description || null,
      image: image || null,
    })

    res.status(200).json({ card })
  } catch (error) {
    console.log(error.message)
  }
})

CardAPIRouter.patch('/card/:id', async (req, res) => {
  const cardId = req.params.id
  const newData = req.body

  try {
    const card = await Cards.findOne({
      where: {
        id: cardId,
        userId: req.session.user.id,
      },
    })
    if (!card) {
      return res.status(404).json({ error: 'Не найдено' })
    }

    // в PATCH обновляем только то, что пришло, остальное не трогаем

    Object.keys(newData).forEach((key) => {
      card[key] = newData[key]
    })
    card.save()
    res.status(200).json({ card })
  } catch (error) {
    console.log(error.message)
  }
})

CardAPIRouter.post('/card', async (req, res) => {
  const newData = req.body
  console.log('newData', newData)

  try {
    const card = await Cards.create({
      userId: req.session.user.id,
      title: newData.title,
      description: newData.description,
      image: newData.image,
      pusblushed: false,
    })
    if (!card) {
      return res.status(404).json({ error: 'Не найдено' })
    }

    res.status(201).json({ card })
  } catch (error) {
    console.log(error.message)
  }
})

CardAPIRouter.delete('/card/:id', async (req, res) => {
  const cardId = req.params.id

  try {
    const card = await Cards.findOne({
      where: {
        id: cardId,
        userId: req.session.user.id,
      },
    })
    card.destroy()
    res.status(204).end()
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = CardAPIRouter
