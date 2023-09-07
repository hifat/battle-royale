const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const UserSchema = new Schema({
   username: {
      type: String,
      required: true,
   },
   lineUUID: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
})

module.exports = mongoose.model('User', UserSchema)
