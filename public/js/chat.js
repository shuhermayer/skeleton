const chatForm = document.getElementById('chatForm')

const wsc = new WebSocket('ws://localhost:3000')

wsc.addEventListener('error', () => {
  console.log('Websocket error')
})
wsc.onopen = () => {
  console.log('WebSocket Client Connected')
}
wsc.onclose = () => {
  console.log('WS: Disconnected')
}

wsc.onmessage = (message) => {
  console.log('message.data', message.data)
  const res = JSON.parse(message.data)
  // const data = JSON.parse(res.message)
  console.log('res', res)
  const chatContainer = document.getElementById('chatContainer')
  chatContainer.innerHTML += `<p>${res.login}: ${res.message}</p>`
}
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const chatInput = chatForm.chatInput.value
  console.log('chat input: ', chatInput)
  wsc.send(chatInput)
  chatForm.chatInput.value = ''
})
