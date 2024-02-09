const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { Cards } = require('../../../db/models/index')
const Layout = require('../../views/Layout')
const { default: Card } = require('../../views/Card')
const { default: CardEdit } = require('../../views/CardEdit')

const CardViewRouter = express.Router()

CardViewRouter.get('/new', (req, res) => {
  const layoutProps = { user: req.session.user }
  const componentProps = { user: req.session.user }
  const page = res.renderComponent(layoutProps, CardEdit, componentProps)
  res.send(page)
})

CardViewRouter.get('/:id', async (req, res) => {
  try {
    const cardId = req.params.id
    const { user } = req.session
    const card = await Cards.findOne({
      where: {
        id: cardId,
        userId: user.id,
      },
      raw: true,
    })

    const layoutProps = { user: req.session.user }
    const componentProps = { card }

    const page = res.renderComponent(layoutProps, Card, componentProps)
    res.send(page)
  } catch (error) {
    console.error(error.message)
  }
})

CardViewRouter.get('/:id/edit', async (req, res) => {
  console.log('card edit router')
  const cardId = req.params.id

  try {
    const card = await Cards.findByPk(+cardId)

    const layoutProps = { user: req.session.user }
    const componentProps = { card, user: req.session.user }
    const page = res.renderComponent(layoutProps, CardEdit, componentProps)
    res.send(page)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = CardViewRouter
