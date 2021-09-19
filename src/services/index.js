const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../../config')

const services = {}

services.createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.secretToken)
}

module.exports = services