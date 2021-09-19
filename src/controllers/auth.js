const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services/index')

const controllerAuth = {}

controllerAuth.signUp = (req, res) => {
    const userData = req.body

    const newUser = new User({
        email: userData.email,
        displayName: userData.displayName
    }) 

    newUser.save((err) => {
        if(err) {
            return res.status(500).json({
                codigo: 'Error-CreateUser-0000',
                titulo: 'Problemas al crear el usuario.',
                mensaje: 'No se pudo crear el usuario.',
                respuesta: err
            })
        }

        res.status(200).json({
            codigo: 'Exito-CreateUser-0000',
            titulo: 'Se creo el usuario.',
            mensaje: 'Se creo el usuario de forma correcta.',
            respuesta: {
                token: service.createToken(user)
            }
        })
    })
}

controllerAuth.signIn = (req, res) => {

}

module.exports = controllerAuth