
const { request, response } = require('express')
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../../config')

const middlewares = {}

middlewares.isAuth (req=request, res=response, next) {
    if (!req.headers.authorization) 
        return res.status(403).send({message: 'No hay autorización'})

    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.decode(token, config.secretToken)

    if (payload.exp < moment().unix()) 
        return res.status(401).send({message: 'El token ha expirado.'})

    req.user = payload.sub

    next()
}

module.exports = middlewares