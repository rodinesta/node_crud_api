const ApiError = require('../error/ApiError')
const {Review} = require('../models/models')

class reviewController {
    async create(req, res, next) {
        try {
            const {text, MemberId} = req.body
            return res.json(await Review.create({text, MemberId}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            return res.json(await Review.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            return res.json(await Review.findOne({where: {id}}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new reviewController()