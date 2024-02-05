const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Main = require('../../views/Main')
const Layout = require('../../views/Layout')
const { Cards } = require('../../../db/models/index')

const router = express.Router()

router.get('/', async (req, res) => {
  const cards = await Cards.findAll({
    where: {
      published: true,
    },
  })
  const element = React.createElement(
    Layout,
    {
      title: 'Главная',
      user: req.session.user,
    },
    React.createElement(Main, { cards, user: req.session.user }),
  )
  const html = ReactDOMServer.renderToStaticMarkup(element)

  res.write('<!DOCTYPE html>')
  res.end(html)
})

module.exports = router
