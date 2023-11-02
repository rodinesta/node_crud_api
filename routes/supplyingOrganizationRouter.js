const Router = require('express')
const router = new Router()
const supplyingOrganizationController = require('../controllers/supplyingOrganizationController')

router.post('/', supplyingOrganizationController.create)
router.get('/', supplyingOrganizationController.getAll)

module.exports = router