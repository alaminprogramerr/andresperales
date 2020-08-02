const express=require('express')
const app=express()
const server=require('http').createServer(app)
const io=require('socket.io')(server)
const PORT =process.env.PORT|| 5000






io.on('connection',(socket)=>{
    console.log(socket.id,'is connected ')
    socket.on('sendInfo',data=>{
        console.log(data)
    })
})

server.listen(PORT,()=>{
    console.log('Server started on ',PORT)
})