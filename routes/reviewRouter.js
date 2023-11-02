const Router = require('express')
const router = new Router()
const ReviewController = require('../controllers/reviewController')

router.post('/', ReviewController.create)
router.get('/', ReviewController.getAll)
router.get('/:id', ReviewController.getOne)

module.exports = router