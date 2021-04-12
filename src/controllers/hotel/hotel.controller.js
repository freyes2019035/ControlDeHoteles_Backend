const hotelModel = require('../../models/hotel.model');
const userModel = require('../../models/users.model')
const authController = require('../auth/auth.controller');
const warnings = require('../../utils/warnings/warnings.message');
const moment = require('moment');

exports.createHotel = async (req, res) => {
    const user = req.user
    const {name, address, phone, email, images} = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        const user_id = user.sub;
        const creation_Date = moment().format();
        const username = name.split(' ')[0] + moment().format('yyyy');
        const password = Math.random().toString(36).slice(-8);
        const hotel = new hotelModel();
        if(name && address && phone && email && images){
            authController.createHotelUser({name, email, username, password}).then(user => {
                const newUser = user;
                hotel.name = name;
                hotel.address = address;
                hotel.phone = phone;
                hotel.email = email;
                hotel.user = newUser._id;
                hotel.images = images;
                hotel.creator = user_id;
                hotel.creation_Date = creation_Date;
                hotel.no_reservations = 0;
                hotelModel.find({name: hotel.name, email: hotel.email, address: hotel.address, phone: hotel.phone}, (err, docs) => {
                    if(err){
                        warnings.message_500(res)
                    }else if(docs && docs.length >= 1){
                        warnings.message_alreadyExists(res, 'hotel')
                    }else{
                        hotel.save(async (err, hotel) => {
                            if(err){
                                warnings.message_500(res)
                            }else{
                                res.status(200).send([
                                    {user},
                                    {hotel}
                                ])
                            }
                        })
                    }
                })
            }).catch(error => {
                warnings.message_custom(res, error)
            })
            
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}
exports.updateHotel = async (req, res) => {
    const user = req.user
    const hotel_id = req.params.id;
    const body = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        if(hotel_id && body){
            delete body.creation_Date;
            delete body.no_reservations;
            delete body.creator;
            delete body.user;
            hotelModel.findByIdAndUpdate(hotel_id, body, {new: true},(err, docUpdate) => {
                if(err){
                    console.log(err)
                    warnings.message_500(res)
                }else if(!docUpdate){
                    console.log(docUpdate)
                    warnings.message_500(res)
                }else{
                    res.status(200).send(docUpdate)
                }
            });
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}
/*Search functions*/
exports.getHotels = async (req, res) => {
    await hotelModel.find({}, (err, hotels) => {
        if(err){
            warnings.message_500(res)
        }else{
            res.status(200).send(hotels)
        }
    })
}
exports.getHotel = async(req, res) => {
    const id = req.params.id;
    if(id){
        await hotelModel.findById(id, (err, hotel) => {
            if(err){
                warnings.message_500(res)
            }else if(!hotel){
                warnings.message_500(res)
            }else{
                res.status(200).send(hotel)
            }
        })
    }else{
        warnings.message_400(res)
    }
}
exports.getHotelByName = async(req, res) => {
    const {name} = req.body;
    if(name){
        hotelModel.find({name: name}, (err, doc) => {
            if(err){
                warnings.message_500(res)
            }else if(doc && doc.length === 0){
                console.log(doc)
                warnings.message_404(res, 'hotels')
            }else {
                res.status(200).send(doc)
            }
        });
    }else{
        warnings.message_400(res)
    }
}
exports.getHotelByAdress = async(req, res) => {
    const {address} = req.body;
    if(address){
        hotelModel.find({address: address}, (err, doc) => {
            if(err){
                warnings.message_500(res)
            }else if(doc && doc.length === 0){
                console.log(doc)
                warnings.message_404(res, 'hotels')
            }else {
                res.status(200).send(doc)
            }
        });
    }else{
        warnings.message_400(res)
    }
}