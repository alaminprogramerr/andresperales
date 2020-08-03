const express=require('express')
const app=express()
const server=require('http').createServer(app)
const io=require('socket.io')(server)
const PORT =process.env.PORT|| 5000





let users={}
io.on('connection',(socket)=>{
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
    socket.emit('myID',{id:socket.id})
    io.sockets.emit('allUser',{users:users})
    socket.on('disconnect',()=>{
        console.log(socket.id,'has left')
        delete users[socket.id]
    })
    socket.on('call',data=>{
        io.to(data.to).emit('transportedCall',{from:data.from,stream:data.stream})
    })
    socket.on('acceptCall',data=>{
        io.to(data.to).emit('callAccepted',{data:data.data})
    })
    
})



server.listen(PORT,()=>{
    console.log('Server started on ',PORT)
})