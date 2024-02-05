const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Main = require('../../views/Main')
const Layout = require('../../views/Layout')
const { Cards, Cart: Carts } = require('../../../db/models/index')
const { default: Card } = require('../../views/Card')
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
    const element = React.createElement(
      Layout,
      {
        title: 'Корзина',
        user: req.session.user,
      },
      React.createElement(Cart, { cart }),
    )
    const html = ReactDOMServer.renderToStaticMarkup(element)

    res.write('<!DOCTYPE html>')
    res.end(html)
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = CartViewRouter
