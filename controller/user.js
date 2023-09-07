const User = require('../model/User')

exports.joined = async (io, socket, data) => {
   const { username, lineUUID } = data
   if (!data.lineUUID) {
      socket.emit('joined', {
         error: 'please send line uuid',
      })
      return
   }

   const user = await User.findOne({ lineUUID })
   if (!user) {
      const newUser = new User({ username, lineUUID })
      user = await newUser.save()
   }

   // socket.broadcast
   io.sockets.emit('joined', {
      user,
   })
}
