const CardAPIRouter = require('express').Router()
const { where } = require('sequelize')
const { Cards } = require('../../../db/models/index')

CardAPIRouter.put('/card', async (req, res) => {
  const { id, title, description, image } = req.body

  try {
    const card = await Cards.findOne({
      where: {
        id,
        userId: req.session.user.id,
      },
    })
    if (!card) {
      return res.status(404).json({ error: 'Не найдено' })
    }

    // способ 1
    await card.update({
      title,
      description,
      image,
    })

    res.status(200).json({ status: 'OK' })

    // способ 2
    // card.title = title;
    // card.description = description;
    // card.image = image;
    // await card.save();

    // способ 3
    // await Cards.update({
    //   where: {
    //     id,
    //   },
    // })

    console.log('card', card)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = CardAPIRouter
