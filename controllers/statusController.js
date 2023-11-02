const {SectorStatus} = require('../models/models')

class statusController {
    async getAll(req, res) {
        return res.json(await SectorStatus.findAll())
    }
}

module.exports = new statusController()