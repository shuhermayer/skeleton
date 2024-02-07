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

    const layoutProps = {
      title: 'Каталог',
      user: req.session.user,
      titleCode: 'Catalog',
    }
    const componentProps = { cards, user: req.session.user }

    const page = res.renderComponent(layoutProps, Shop, componentProps)
    res.send(page)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = ShopViewRouter
