const Router = require('express')
const router = new Router()

const resourceRouter = require('./resourceRouter')
const supplyingOrganizationRouter = require('./supplyingOrganizationRouter')
const sectorStatusRouter = require('./sectorStatusRouter')
const sectorRouter = require('./sectorRouter')
const memberRouter = require('./memberRouter')
const paymentRouter = require('./paymentRouter')
const reviewRouter = require('./reviewRouter')
const commentRouter = require('./commentRouter')

router.use('/resource', resourceRouter)
router.use('/supplyingOrganization', supplyingOrganizationRouter)
router.use('/sectorStatus', sectorStatusRouter)
router.use('/sector', sectorRouter)
router.use('/member', memberRouter)
router.use('/payment', paymentRouter)
router.use('/review', reviewRouter)
router.use('/comment', commentRouter)

module.exports = router