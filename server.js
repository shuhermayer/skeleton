require('@babel/register')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const serverConfig = require('./config/serverConfig')
const indexRouter = require('./src/routes/view/index.routes')
const RegistrationAPIRouter = require('./src/routes/api/register.routes')
const LoginAPIRouter = require('./src/routes/api/login.routes')
const sessionConfig = require('./config/sessionConfig')
const ShopCabinetRouter = require('./src/routes/view/ShopCabinet.routes')
const CardViewRouter = require('./src/routes/view/Card.routes')
const CardAPIRouter = require('./src/routes/api/card.routes')
const ShopViewRouter = require('./src/routes/view/Shop.routes')
const CartAPIRouter = require('./src/routes/api/cart.routes')
const CartViewRouter = require('./src/routes/view/Cart.routes')
const ssr = require('./src/middlewares/Render')
const { default: Chat } = require('./src/views/Chat')
const ChatViewRouter = require('./src/routes/view/Chat.routes')
const configureSockets = require('./src/lib/wsocket')

const app = express()
const PORT = 3000

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API',
      description: 'API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['server.js', './src/routes/api/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(session(sessionConfig))
const expressSessionMiddleware = session(sessionConfig)
app.use(cookieParser())
serverConfig(app)

// views routes
app.use('/', ssr, indexRouter)
app.use('/shop-cabinet', ssr, ShopCabinetRouter)
app.use('/card', ssr, CardViewRouter)
app.use('/shop', ssr, ShopViewRouter)
app.use('/cart', ssr, CartViewRouter)
app.use('/chat', ssr, ChatViewRouter)

// api routes
app.use('/api', RegistrationAPIRouter)
app.use('/api', LoginAPIRouter)
app.use('/api', CardAPIRouter)
app.use('/api', CartAPIRouter)

const server = app.listen(PORT, () => console.log(`Server is up on http://localhost:${PORT}`))
configureSockets(server, expressSessionMiddleware)
