const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Layout = require('../../views/Layout')
const { Cards, Cart: Carts } = require('../../../db/models/index')
const Cart = require('../../views/Cart')

const CartViewRouter = express.Router()

CartViewRouter.get('/', async (req, res) => {
  const { user } = req.session
  try {
    const cart = await Carts.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: Cards,
          where: { userId: user.id },
        },
      ],
    })
    const layoutProps = {
      title: 'Корзина',
      user: req.session.user,
    }
    const componentProps = { cart }
    const page = res.renderComponent(layoutProps, Cart, componentProps)
    res.send(page)
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = CartViewRouter
