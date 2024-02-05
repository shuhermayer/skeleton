const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Layout = require('../../views/Layout')
const { Cards, Cart } = require('../../../db/models/index')
const { default: Shop } = require('../../views/Shop')

const ShopViewRouter = express.Router()

ShopViewRouter.get('/*', async (req, res) => {
  const { user } = req.session
  if (!user && !req.query.login) {
    return res.redirect('/shop?login=false')
  }
  try {
    const cards = await Cards.findAll({
      where: {
        published: true,
      },
      include: [
        {
          model: Cart,
          where: { userId: user.id },
          required: false,
        },
      ],
    })
    const element = React.createElement(
      Layout,
      {
        title: 'Магазин',
        user: req.session.user,
      },
      React.createElement(Shop, { cards, user: req.session.user }),
    )
    const html = ReactDOMServer.renderToStaticMarkup(element)

    res.write('<!DOCTYPE html>')
    res.end(html)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = ShopViewRouter
