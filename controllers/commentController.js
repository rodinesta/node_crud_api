const ApiError = require('../error/ApiError')
const {Comment, Review} = require('../models/models')

class commentController {
    async create(req, res, next) {
        try {
            const {text, ReviewId, MemberId} = req.body
            return res.json(await Comment.create({text, ReviewId, MemberId}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            return res.json(await Comment.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new commentController()