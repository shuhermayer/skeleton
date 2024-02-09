import React from 'react'

function Chat() {
  return (
    <div>
      <form id="chatForm" name="chatForm">
        <input type="text" name="chatInput" />
        <button type="submit">Send</button>
      </form>
      <div id="chatContainer" />
    </div>
  )
}

export default Chat
