const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { Cards } = require('../../../db/models/index')
const Layout = require('../../views/Layout')
const { default: Card } = require('../../views/Card')
const { default: CardEdit } = require('../../views/CardEdit')

const CardViewRouter = express.Router()

CardViewRouter.get('/:id', async (req, res) => {
  console.log('card view router')
  const cardId = req.params.id
  const { user } = req.session
  const card = await Cards.findOne({
    where: {
      id: cardId,
      userId: user.id,
    },
    raw: true,
  })
  console.log('card', card)

  const component = React.createElement(Layout, { user: req.session.user }, React.createElement(Card, { card }))
  const html = ReactDOMServer.renderToStaticMarkup(component)
  res.write('<!DOCTYPE html>')
  res.end(html)
})

CardViewRouter.get('/:id/edit', async (req, res) => {
  console.log('card edit router')
  const cardId = req.params.id

  try {
    const card = await Cards.findByPk(+cardId)
    const component = React.createElement(Layout, { user: req.session.user }, React.createElement(CardEdit, { card }))
    const html = ReactDOMServer.renderToStaticMarkup(component)
    res.write('<!DOCTYPE html>')
    res.end(html)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = CardViewRouter
