const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobs: []
})

module.exports = mongoose.model('User', userSchema)
