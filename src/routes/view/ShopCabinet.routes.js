const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Layout = require('../../views/Layout')
const { Cards } = require('../../../db/models/index')
const { default: ShopCabinet } = require('../../views/ShopCabinet')

const ShopCabinetRouter = express.Router()

ShopCabinetRouter.get('/', async (req, res) => {
  console.log('req.session.user', req.session.user)
  const cards = await Cards.findAll({
    where: {
      userId: req.session.user.id,
    },
  })
  const element = React.createElement(
    Layout,
    {
      user: req.session.user,
    },
    React.createElement(ShopCabinet, { title: 'Card List', cards }),
  )
  const html = ReactDOMServer.renderToStaticMarkup(element)

  res.write('<!DOCTYPE html>')
  res.end(html)
})

module.exports = ShopCabinetRouter
