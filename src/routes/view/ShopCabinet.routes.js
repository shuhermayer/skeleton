const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Layout = require('../../views/Layout')
const { Cards } = require('../../../db/models/index')
const { default: ShopCabinet } = require('../../views/ShopCabinet')

const ShopCabinetRouter = express.Router()

ShopCabinetRouter.get('/', async (req, res) => {
  const cards = await Cards.findAll({
    where: {
      userId: req.session.user.id,
    },
  })

  const layoutProps = {
    user: req.session.user,
    titleCode: 'ShopCabinet',
    title: 'Кабинет магазина',
  }

  const componentProps = { title: 'Card List', cards, user: req.session.user }

  const page = res.renderComponent(layoutProps, ShopCabinet, componentProps)
  res.send(page)
})

module.exports = ShopCabinetRouter
