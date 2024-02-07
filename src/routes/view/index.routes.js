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

  const layoutProps = {
    title: 'Главная',
    user: req.session.user,
    titleCode: 'Main',
  }
  const componentProps = { cards, user: req.session.user }

  const page = res.renderComponent(layoutProps, Main, componentProps)
  res.send(page)
})

module.exports = router
