const Router = require('express')
const router = new Router()
const sectorController = require('../controllers/sectorController')

router.post('/', sectorController.create)
router.get('/', sectorController.getAll)
router.get('/:id', sectorController.getOne)
router.put('/', sectorController.changePhoto)

module.exports = router