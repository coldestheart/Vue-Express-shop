const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product')
const manufacturerController = require('../../controllers/manufacturer')
const Media = require('../../controllers/fsupload')

router.get('/manufacturers', manufacturerController.all)
router.get('/products', productController.all)
router.get('/products/:id', productController.byId)
router.post('/products', productController.create)
router.post('/manufacturers', manufacturerController.create)
router.put('/products/:id', productController.update)
router.delete('/products/:id', productController.remove)
// Work with files
router.post('/files', Media.uploadMedia)

module.exports = router
