const ChatViewRouter = require('express').Router()
const { default: Chat } = require('../../views/Chat')

ChatViewRouter.get('/', (req, res) => {
  const layoutProps = { user: req.session.user }
  const componentProps = { user: req.session.user }
  const page = res.renderComponent(layoutProps, Chat, componentProps)
  res.send(page)
})

module.exports = ChatViewRouter
