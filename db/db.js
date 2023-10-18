const mongoose = require('mongoose')
const connectionString =
  'mongodb+srv://ivanlozic995:6u9A6Z4TYRo9f3sl@cluster0.345aeq6.mongodb.net/'

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

module.exports = mongoose
