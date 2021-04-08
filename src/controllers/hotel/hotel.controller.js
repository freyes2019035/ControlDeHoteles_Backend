const hotelModel = require('../../models/hotel.model');
const authController = require('../auth/auth.controller');
const warnings = require('../../utils/warnings/warnings.message');
const moment = require('moment')

exports.createHotel = async (req, res) => {
    const user = req.user
    const {name, address, phone, email, images} = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        const user_id = user.sub;
        const creation_Date = moment().format();
        const username = name.split(' ')[0] + moment().format('yyyy');
        const password = Math.random().toString(36).slice(-8);
        if(name && address && phone && email && images){
            authController.createHotelUser({name, email, username, password})
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}