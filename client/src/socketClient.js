import io from 'socket.io-client'
export const socket=io.connect('http://localhost:5000')


export const sendInfo=()=>{
    socket.emit('sendInfo',{name:'alamin'})
}