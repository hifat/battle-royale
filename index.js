const express = require('express')
const socket = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const Entity = require('./model/Entity')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose
   .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('MongoDB Connected...')
   })
   .catch((err) => {
      console.log(err)
   })

app.get('/healthz', (req, res) => {
   res.send('Hi Fooooooooo!!!!!')
})

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
})

const io = socket(server)
io.on('connection', (socket) => {
   console.log('made socket connection', socket.id)

   socket.on('joined', function (data) {
      socket.broadcast.emit('joined', data)
   })

   socket.on('action', function (data) {
      io.sockets.emit('action', data)
   })
})
