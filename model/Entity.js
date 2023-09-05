const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const EntitySchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   }
})

module.exports = mongoose.model('Entity', EntitySchema)