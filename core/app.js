// Инициализация
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./routes/api/index')

app.use(morgan('combined'))
app.use(bodyParser.json())

const mongodb_conn_module = require('./controllers/db')
mongodb_conn_module.connect()

app.all('/*', function (req, res, next) {
  // CORS Заголовки
  res.header('Access-Control-Allow-Origin', '*') // restrict it to the required domain
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

app.use('/api', router)

app.listen(process.env.PORT || 8081)
