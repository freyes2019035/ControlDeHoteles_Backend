const hotelModel = require('../../models/hotel.model');
const userModel = require('../../models/users.model')
const reservationModel = require('../../models/reservation.model')
const recipeModel = require('../../models/recipe.model')
const serviceModel = require('../../models/services.model')
const authController = require('../auth/auth.controller');
const warnings = require('../../utils/warnings/warnings.message');
const moment = require('moment');
const pdfGenerator = require('../../utils/pdf/pdf.generator')

exports.createHotel = async (req, res) => {
    const user = req.user
    const {name, description ,address, phone, email, images} = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        const user_id = user.sub;
        const creation_Date = moment().format();
        const username = name.split(' ')[0] + moment().format('yyyy');
        const password = 123456;
        const hotel = new hotelModel();
        if(name && address && phone && email && images){
            authController.createHotelUser({name, description ,email, username, password}).then(user => {
                const newUser = user;
                hotel.name = name;
                hotel.lastName = name+"_";
                hotel.description = description;
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
exports.deleteHotel = async(req, res) => {
    const id = req.params.id;
    const user = req.user;
    console.log(user)
    if(user.rol === "ROL_ADMINAPP"){
        hotelModel.findById(id, (err, docFound) => {
            if(err){
                warnings.message_500(res)
            }else if(!docFound){
                warnings.message_404(res)
            }else{
                let userId = docFound.user;
                console.log(userId)
                userModel.findByIdAndRemove(userId, (err, userDeleted) => {
                    if(err){
                        warnings.message_500(res)
                    }else if(!userDeleted){
                        warnings.message_404(res)
                    }else{
                        hotelModel.findByIdAndRemove(id, (err, doc) => {
                            if(err){
                                warnings.message_500(res)
                            }else if(!doc){
                                warnings.message_500(res)
                            }else{
                                res.status(200).send(doc);
                            }
                        });
                    }
                })
            }
        })
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
exports.getHotelClients = async(req, res) => {
    // ID de hotel
    const user = req.user;
    if(user.rol === "ROL_ADMINHOTEL"){
        reservationModel.find({hotel: user.sub}).populate('user').exec((err, reservations) => {
            if(err){
                warnings.message_500(res)
            }else if(!reservations){
                warnings.message_404(res, 'reservations')
            }else{
                res.status(200).send(reservations)
            }
        })
    }else{
        warnings.message_401(res)
    }
}
exports.getHotelByName = async(req, res) => {
    const {name} = req.body;
    if(name){
        hotelModel.find({ name: { $regex: name, $options: "i" }}, (err, doc) => {
            if(err){
                console.log(err)
                warnings.message_500(res)
            }else if(doc && doc.length === 0){
                console.log(name)
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
exports.getHotelByAddress = async(req, res) => {
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
exports.getHotelByEmail = async(req, res) => {
    const {email} = req.body;
    if(email){
        hotelModel.find({email: email}, (err, doc) => {
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
exports.generatePDF = async(req, res) => {
    let obj = [];
    let hotelId = req.params.id;
    await hotelModel.find({_id: hotelId}).then(data => obj.push(data));
    await serviceModel.find({hotel: hotelId}).then(data => obj.push(data));
    if(obj){
        pdfGenerator.generatePDF(obj).then(data => {
            res.download(data.filename)
        })
    }
}