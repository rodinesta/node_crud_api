const {Resource} = require("../models/models");
const ApiError = require("../error/ApiError");

class resourceController {
    async getAll(req, res, next) {
        try {
            return res.json(await Resource.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new resourceController()