import React, { useState, useRef } from 'react'
import { sendInfo } from "./socketClient";
import Nav from './Component/Nav'
import UserList from './Component/UserList';
const App = () => {

  const socket=useRef(null)
  useState(()=>{
    sendInfo()
  })
  return (
    <div>
      <Nav/>
      <div className="mt-5 col-md-4 offset-md-4">
        <UserList/>
      </div>
    </div>
  )
}

export default App

