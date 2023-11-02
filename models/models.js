const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Resource = sequelize.define('Resource', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT}
}, {createdAt: false, updatedAt: false})

const SupplyingOrganization = sequelize.define('SupplyingOrganization', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT},
    information: {type: DataTypes.TEXT},
    requisites: {type: DataTypes.TEXT}
}, {createdAt: false, updatedAt: false})

const SectorStatus = sequelize.define('SectorStatus', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT}
}, {createdAt: false, updatedAt: false})

const Sector = sequelize.define('Sector', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.TEXT},
    photo: {type: DataTypes.TEXT}
}, {createdAt: false, updatedAt: false})

const Member = sequelize.define('Member', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.TEXT},
    password: {type: DataTypes.TEXT},
    firstName: {type: DataTypes.TEXT},
    secondName: {type: DataTypes.TEXT},
    thirdName: {type: DataTypes.TEXT},
    phoneNumber: {type: DataTypes.TEXT},
    paymentAmount: {type: DataTypes.INTEGER, defaultValue: 250},
    duty: {type: DataTypes.INTEGER, defaultValue: 0},
    photo: {type: DataTypes.TEXT},
})

const Role = sequelize.define('Role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT}
}, {createdAt: false, updatedAt: false})

const Review = sequelize.define('Review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT}
})

const Comment = sequelize.define('Comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT}
})

//MANY-to-MANY TABLES

const SectorOrganization = sequelize.define('SectorOrganization', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {createdAt: false, updatedAt: false})


//ONE-to-MANY

Resource.hasMany(SupplyingOrganization, {as: 'resource'})
SupplyingOrganization.belongsTo(Resource)

SectorStatus.hasMany(Sector)
Sector.belongsTo(SectorStatus)

Review.hasMany(Comment)
Comment.belongsTo(Review)

Member.hasMany(Comment)
Comment.belongsTo(Member)

Member.hasMany(Review)
Review.belongsTo(Member)

Role.hasMany(Member)
Member.belongsTo(Role)

Sector.hasMany(Member)
Member.belongsTo(Sector)

//MANY-to-MANY

Sector.belongsToMany(SupplyingOrganization, {through: SectorOrganization})
SupplyingOrganization.belongsToMany(Sector, {through: SectorOrganization})


module.exports = {
    Resource, SupplyingOrganization, SectorStatus, Sector, Member, Role, Review, Comment, SectorOrganization
}