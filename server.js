require('@babel/register')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const serverConfig = require('./config/serverConfig')
const indexRouter = require('./src/routes/view/index.routes')
const RegistrationAPIRouter = require('./src/routes/api/register.routes')
const LoginAPIRouter = require('./src/routes/api/login.routes')
const sessionConfig = require('./config/sessionConfig')
const ShopCabinetRouter = require('./src/routes/view/ShopCabinet.routes')
const CardViewRouter = require('./src/routes/view/Card.routes')
const CardAPIRouter = require('./src/routes/api/card.routes')

const app = express()
const PORT = 3000

app.use(session(sessionConfig))
app.use(cookieParser())
serverConfig(app)

// views routes
app.use('/', indexRouter)
app.use('/shop-cabinet', ShopCabinetRouter)
app.use('/card', CardViewRouter)

// api routes
app.use('/api', RegistrationAPIRouter)
app.use('/api', LoginAPIRouter)
app.use('/api', CardAPIRouter)

app.listen(PORT, () => console.log(`Server is up on http://localhost:${PORT}`))
