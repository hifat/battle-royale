const User = require('../model/User')

exports.joined = async (io, socket, data) => {
   const { lineUUID } = data
   if (!data.lineUUID) {
      socket.emit('joined', {
         error: 'LINE_UUID_NOTFOUND',
      })
      return
   }

   const user = await User.findOne({ lineUUID })
   if (!user) {
      socket.emit('joined', {
         error: 'USER_NOT_FOUND',
      })
      return
   }

   // socket.broadcast
   io.sockets.emit('joined', {
      user,
   })
}

exports.register = async (req, res) => {
   const { name, lineUUID } = req.body
   if (!lineUUID) {
      res.send(400, {
         error: 'LINE_UUID_NOTFOUND',
      })
      return
   }

   let user = await User.findOne({ lineUUID })
   if (!user) {
      const newUser = new User({ name, lineUUID })
      await newUser.save()

      user = await User.findOne({ lineUUID })
   }

   res.send(200, {
      user,
   })
}
