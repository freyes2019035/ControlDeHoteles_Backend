'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'controlHoteles_2019035'

exports.createToken = (user) => {
    let payload = {
        sub: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        user: user.user,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }
    return jwt.encode(payload, secret)
}

