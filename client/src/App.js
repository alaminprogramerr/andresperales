import React, { useState, useRef } from 'react'
import {useRecoilState,useRecoilValue} from 'recoil'
import Peer from 'simple-peer'





import { sendInfo,socket } from "./socketClient";
import {myID,allUser,callReciveModal,callAccepted,myVideo,callModal} from './recoilState'
import Nav from './Component/Nav'
import UserList from './Component/UserList';
import IncommingCALL from './Component/IncommingCall';
import { Card, Hidden } from '@material-ui/core';





const App = () => {
  const [stream, setStream] = useState()
  const [getMyID, setMyID] = useRecoilState(myID)
  const [getAllUser, setAllUser] = useRecoilState(allUser)
  const [callerID, setCallerID] = useState('')
  const [callerSignal, setCallerSignal] = useState()
  const [getCallReciveModal, setCallReciveModal] = useRecoilState(callReciveModal)
  const [getCallAccepted, setCallAccepted] = useRecoilState(callAccepted)
  const [getCallModal, setCallModal] = useRecoilState(callModal)



  
  const partNerVideo=useRef()
  const myVideo=useRef()


  useState(()=>{
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
    .then(stream=>{
      setStream(stream)
      if(myVideo.current){
        myVideo.current.srcObject=stream
      }
    })
    socket.on('myID',data=>{
      setMyID(data.id)
    })
    
    socket.on('allUser',data=>{
      setAllUser(data.users)
    })
    socket.on('transportedCall',data=>{
      console.log('transported signal  got')
      setCallerID(data.from)
      setCallerSignal(data.stream)
      console.log('caller signal ', data.stream)
      setCallReciveModal(!getCallReciveModal)
    })

  })

  const callPeer=(id)=>{
    const peer=new Peer({
      initiator:true,
      stream:stream,
      trickle:false
    })
    peer.on('signal',data=>{
      socket.emit('call',{to:id,from:getMyID,stream:data})
    })
    peer.on('stream',stream=>{
      alert()
      console.log(stream)
      if(partNerVideo.current){
        partNerVideo.current.srcObject=stream
      }
    })
    socket.on('callAccepted',data=>{
      setCallAccepted(true)
      setCallModal(false)
      console.log('partner data' ,data.data)
      peer.signal=data.data
    })
  }
  const acceptCall=()=>{
    setCallAccepted(true)
    const peer = new Peer({
      initiator:true,
      trickle:false,
      stream:stream
    })
    peer.on('signal',data=>{
      socket.emit('acceptCall',{data:data,to:callerID})
    })
    
    peer.on('stream',stream=>{
      partNerVideo.current.srcObject=stream
    })
    peer.signal=callerSignal 
    setCallReciveModal(false)
    console.log('call accepted partner video ',partNerVideo)
  }
  return (
    <div>
      <Nav/>
      <div className="mt-5">
        <div className="col-md-5">
            {
              stream?
              <Card style={{overflow:'hidden',padding:'30px 10px'}}>   
                <video style={{maxHeight:'200px',maxWidth:'300px'}} playsInline muted autoPlay ref={myVideo}/>
                
              </Card>:''
              
            } 
        </div>
        <div className="col-md-5">
            {
              getCallAccepted?
              <Card style={{overflow:'hidden',padding:'30px 10px'}}>   
                <h1>Call accepted</h1>
                <video playsInline ref={partNerVideo} autoPlay />
              </Card>:''
            } 

        </div>
      </div>
      <div className="mt-5 col-md-4 offset-md-4">
        <UserList callFunction={callPeer} stream={stream} myVideo={myVideo} />
        <IncommingCALL  id={callerID} acceptFunction={acceptCall} />
      </div>
    </div>
  )
}
export default App
