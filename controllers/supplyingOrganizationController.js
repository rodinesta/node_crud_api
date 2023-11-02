const {SupplyingOrganization, Resource} = require('../models/models')
const ApiError = require('../error/ApiError')

class SupplyingOrganizationController {
    async create(req, res) {
        try {
            const {title, information, requisites, ResourceId} = req.body
            const supplyingOrganization = await SupplyingOrganization.create({title, information, requisites, ResourceId})

            return res.json(supplyingOrganization)

        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async getAll(req, res) {
        return res.json(await SupplyingOrganization.findAll({include: [{model: Resource}]}))
    }
}

module.exports = new SupplyingOrganizationController()