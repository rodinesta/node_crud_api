const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const {Member} = require('../models/models')
const path = require("path");
const {where} = require("sequelize");

const generateJwt = (id, login, roleId) => {
    return jwt.sign(
        {id, login, roleId},
        process.env.SECRET_KEY,
        {expiresIn: '30d'}
    )
}

class memberController {
    async registration(req, res, next) {
        try {
            const {login, password, firstName, secondName, thirdName, phoneNumber, RoleId} = req.body
            if(!login || !password) {
                return next(ApiError.badRequest('Некорректный логин или пароль'))
            }
            const candidate = await Member.findOne({where: {login}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const member = await Member.create({login, password: hashPassword,  firstName, secondName, thirdName, phoneNumber, RoleId})
            const token = generateJwt(member.id, login, RoleId)
            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const member = await Member.findOne({where: {login}})
            if (!member) {
                return next(ApiError.badRequest('Пользователь с таким логином не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, member.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'))
            }
            const token = generateJwt(member.id, member.login, member.RoleId)

            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            return res.json(await Member.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            return res.json(await Member.findOne({where: {id}}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changePhoto(req, res, next) {
        try {
            const {id} = req.body
            const {Img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await Img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const member = await Member.update({photo: fileName}, {where: {id}})
            return res.json(member)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async changeInfo(req, res, next) {
        try {
            const {id, secondName, firstName, phoneNumber} = req.body
            return res.json(await Member.update({secondName: secondName, firstName: firstName, phoneNumber: phoneNumber}, {where: {id}}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setSector(req, res, next) {
        try {
            const {id, sectorId} = req.body
            const member = await Member.update({SectorId: sectorId}, {where: {id}})
            return res.json(member)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new memberController()