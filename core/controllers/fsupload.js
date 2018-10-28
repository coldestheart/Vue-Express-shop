const formidable = require('formidable')
const path = require('path')
const uploadDir = path.join('public/files')

const Media = {
  uploadMedia (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ error: err })
    })
    form.on('fileBegin', function (name, file) {
      const [fileName, fileExt] = file.name.split('.')
      file.path = path.join(uploadDir, `${fileName}.${fileExt}`)
      res.status(200).json('OK')
    })
  }
}

module.exports = Media
