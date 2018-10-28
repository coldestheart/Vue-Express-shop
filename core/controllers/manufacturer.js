const Model = require('../model/index')
const {Product, Manufacturer} = Model

const manufacturerController = {
  all (req, res) {
    // Получить всех производителей
    Manufacturer.find({})
      .exec((err, manufacturers) => res.json(manufacturers))
  },
  create (req, res) {
    const requestBody = req.body
    // Создаем новую запись
    const newMan = new Manufacturer(requestBody)
    newMan.save((err, saved) => {
      Manufacturer
        .findOne({_id: saved._id})
        .populate('manufacturer')
        .exec((err, product) => res.json(product))
    })
  }
}
module.exports = manufacturerController
