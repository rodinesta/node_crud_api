const Router = require('express')
const router = new Router()
const resourceController = require('../controllers/resourceController')

router.get('/', resourceController.getAll)

module.exports = router