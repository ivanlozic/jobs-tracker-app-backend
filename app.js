const express = require('express')
const app = express()
const mongoose = require('./db/db')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const port = process.env.PORT || 5000

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  next()
})

app.use(bodyParser.json())

app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
