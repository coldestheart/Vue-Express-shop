// INIT
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./routes/api/index')
const authmodule = require('./routes/api/auth')
app.use(morgan('combined'))
app.use(bodyParser.json())

const mongodbconnmodule = require('./controllers/db')
mongodbconnmodule.connect()

app.all('/*', function (req, res, next) {
  // CORS Заголовки
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  // Настраиваем CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

/// ///// Подключаем наши модели
app.use('/', authmodule)
app.use('/public', express.static('public'))
app.use('/api', router)

app.listen(8081, 'localhost')
