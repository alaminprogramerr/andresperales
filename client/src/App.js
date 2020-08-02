import React, { useState, useRef } from 'react'
// import io from 'socket.io-client'
import { sendInfo } from "./socketClient";
const App = () => {

  const socket=useRef(null)
  useState(()=>{
    sendInfo()
  })
  return (
    <div>
        <h4>Video Chat</h4>
    </div>
  )
}

export default App

