const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Layout = require('../views/Layout')

function renderComponent(layoytProps, component, componentProps) {
  const element = React.createElement(Layout, { ...layoytProps }, React.createElement(component, { ...componentProps }))
  const html = ReactDOMServer.renderToStaticMarkup(element)
  return `<DOCTYPE html> ${html}`
}

const ssr = (req, res, next) => {
  res.renderComponent = renderComponent
  next()
}

module.exports = ssr
