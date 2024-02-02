const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Main = require('../../views/Main')
const Layout = require('../../views/Layout')
const { Cards } = require('../../../db/models/index')

const router = express.Router()

router.get('/', async (req, res) => {
  console.log('req.session.user', req.session.user)
  const cards = await Cards.findAll()
  const element = React.createElement(
    Layout,
    {
      user: req.session.user,
    },
    React.createElement(Main, { title: 'Card List', cards }),
  )
  const html = ReactDOMServer.renderToStaticMarkup(element)

  res.write('<!DOCTYPE html>')
  res.end(html)
})

module.exports = router
