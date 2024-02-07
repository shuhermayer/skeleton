const CartAPIRouter = require('express').Router()

const { Cart, Card } = require('../../../db/models/index')

CartAPIRouter.post('/cart/add', async (req, res) => {
  const { cardId } = req.body
  const userId = req.session.user.id

  try {
    const cart = await Cart.findOne({
      where: {
        cardId,
        userId,
      },
    })

    if (cart) {
      cart.count++
      await cart.save()
    } else {
      await Cart.create({
        cardId,
        userId,
        count: 1,
      })
    }
    res.status(201).json({ ...cart })
  } catch (error) {
    console.log(error.message)
  }
})

/**
 * @swagger
 * /api/cart/:id:
 *   patch:
 *     tags:
 *       - Cart
 *     description: Use to change some data in cart item
 *     responses:
 *       '200':
 *         description: A successful response
 */
CartAPIRouter.patch('/cart/:id', async (req, res) => {
  const { id } = req.params
  const userId = req.session.user.id
  const newData = req.body

  try {
    const cart = await Cart.findOne({
      where: {
        id,
        userId,
      },
    })

    if (cart) {
      Object.keys(newData).forEach((key) => {
        cart[key] = newData[key]
      })
      await cart.save()
    } else {
      res.status(404).json({ error: 'Не найдено' })
    }
    res.status(200).json({ ...cart.dataValues })
  } catch (error) {
    console.log(error.message)
  }
})

/**
 * @swagger
 * /api/cart/:id:
 *   delete:
 *     tags:
 *       - Cart
 *     description: DELETE item from user cart by id
 *     responses:
 *       '201':
 *         description: A successful response without body
 */
CartAPIRouter.delete('/cart/:id', async (req, res) => {
  const { id } = req.params
  const userId = req.session.user.id

  try {
    const cart = await Cart.findOne({
      where: {
        id,
        userId,
      },
    })
    if (cart) {
      await cart.destroy()
      await cart.save()
    } else {
      res.status(404).json({ error: 'Не найдено' })
    }
    res.status(201).end()
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = CartAPIRouter
