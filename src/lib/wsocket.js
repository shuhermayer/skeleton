const { Server } = require('http')
const { WebSocket, WebSocketServer } = require('ws')

function onSocketPreError(e) {
  console.error('WebSocket error', e)
}

function onSocketPostError(e) {
  console.error('WebSocket error', e)
}

module.exports = function configure(server, expressSessionMiddleware) {
  const wss = new WebSocketServer({ noServer: true })

  server.on('upgrade', (request, socket, head) => {
    socket.on('error', onSocketPreError)

    // if (request.headers.BadAuth) {
    //   socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
    //   socket.destroy()
    //   return console.error('Unauthorized')
    // }

    expressSessionMiddleware(request, {}, () => {
      if (!request.session || !request.session.user) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return console.error('Unauthorized')
      }
    })

    wss.handleUpgrade(request, socket, head, (ws) => {
      socket.removeListener('error', onSocketPreError)
      wss.emit('connection', ws, request)
    })
  })

  wss.on('connection', (ws, req) => {
    ws.on('error', onSocketPostError)

    ws.on('message', (msg, isBinary) => {
      console.log('msg', msg.toString('utf8'))
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              clientId: req.session.user.id,
              login: req.session.user.login,
              message: msg.toString('utf8'),
            }),
            { binary: isBinary },
          )
        }
      })
    })

    ws.on('close', () => {
      console.log('Connection closed')
    })
  })
}
