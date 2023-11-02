const ApiError = require('../error/ApiError')
const {Sector, Member, SectorOrganization, SupplyingOrganization, Resource, SectorStatus} = require('../models/models')
const uuid = require("uuid");
const path = require("path");

class sectorController {
    async create(req, res, next) {
        try {
            const {address, SectorStatusId} = req.body
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg"
            await photo.mv(path.resolve(__dirname, '..', 'static', fileName))

            const sector = await Sector.create({address, SectorStatusId, photo:fileName})
            return res.json(sector)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            return res.json(await Sector.findAll({
                include: [{model: Member}, {model: SectorStatus}]
            }))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            return res.json(await Sector.findOne({where: {id}}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changePhoto(req, res, next) {
        try {
            const {id} = req.body
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg"
            await photo.mv(path.resolve(__dirname, '..', 'static', fileName))

            const sector = await Sector.update({photo: fileName}, {where: {id}})
            return res.json(sector)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new sectorController()