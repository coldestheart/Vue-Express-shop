var mongoose = require('mongoose')
var dbc = require('../configuration.conf')

module.exports.connect = function () {
  const uri = 'mongodb://' + dbc.user + ':' + dbc.pass + '@' + dbc.uri + '/' + dbc.name
  mongoose.connect(uri, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Не соединено'))
  db.once('open', function () {
    console.log('ПОДКЛЮЧЕНО!')
  })
  return db
}
