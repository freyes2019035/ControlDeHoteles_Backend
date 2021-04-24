const reservationModel = require('../../models/reservation.model');
const warnings = require('../../utils/warnings/warnings.message');
const moment = require('moment')
const roomModel = require('../../models/room.model');
const recipeModel = require('../../models/recipe.model');
async function createReservation(req, res){
    const user = req.user;
    const { dateOfArrive, dateOfDeparture, roomID, hotel, services} = req.body;
    if(user.rol === "ROL_USER"){
        if(dateOfArrive && dateOfDeparture && roomID && hotel && services){
            const reservation = new reservationModel();
            const recipe = new recipeModel();
            const today = moment().format('YYYY/MM/DD')
            reservation.dateOfReservation = today
            reservation.services = services;
            reservation.subTotalServices = await calcTotal(services);
            reservation.dateOfArrive = dateOfArrive;
            reservation.dateOfDeparture = dateOfDeparture
            const noOfDaysOfStay = Math.ceil(Math.abs(new Date(dateOfArrive) - new Date(dateOfDeparture)) / (1000 * 60 * 60 * 24)) - 1; 
            reservation.noOfDaysOfStay = noOfDaysOfStay;
            const room = await roomModel.findById(roomID);
            if(room){
                reservation.roomID = roomID;
                const roomPrice = room.price;
                reservation.subTotalRoom =  (roomPrice * noOfDaysOfStay).toFixed(2);
            }
            reservation.hotel = hotel;
            reservation.user = user.sub;
            
            reservationModel.find({dateOfArrive: dateOfArrive,dateOfDeparture: dateOfDeparture,hotel: hotel,roomID: roomID}, (err, reservationFound) => {
                if(err){
                    warnings.message_500(res)
                }else if(reservationFound.length >= 1){
                    warnings.message_alreadyExists(res, 'reservation')
                }else{
                    reservation.save((err, reservation) => {
                        if(err){
                            warnings.message_500(res)
                        }else if(!reservation){
                            warnings.message_500(res)
                        }else{
                            recipe.emision_date = today;
                            recipe.reservation = reservation._id;
                            recipe.user = user.sub;
                            recipe.total = reservation.subTotalServices + reservation.subTotalRoom;
                            recipe.save((err, recipe) => {
                                if(err){
                                    warnings.message_500(res)
                                }else if(!recipe){
                                    warnings.message_500(res)
                                }else{
                                    res.status(200).send([reservation, recipe])
                                }
                            })
                        }
                    })
                }
            })
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}
async function updateReservation(req, res){
    const user = req.user;
    const id = req.params.id;
    const body = req.body;
    if(user.rol === "ROL_USER"){
        reservationModel.findById(id, (err, reservationFound) => {
            if(err){
                warnings.message_500(res)
            }else if(!reservationFound){
                warnings.message_404(res, 'reservation')
            }else{
                if(reservationFound.user.toString() === user.sub){
                    delete body.user;
                    reservationModel.findByIdAndUpdate(id, body, (err, reservationUpdated) => {
                        if(err){
                            warnings.message_500(res)
                        }else if(!reservationUpdated){
                            warnings.message_404(res, 'reservation')
                        }else{
                            res.status(200).send(reservationUpdated)
                        }
                    })
                }else{
                    warnings.message_custom(res, 'Sorry you can not update a reservation that is not yours')
                }
            }
        })
    }else{
        warnings.message_401(res)
    }
}
async function deleteReservation(req, res){
    const user = req.user;
    const id = req.params.id;
    if(user.rol === "ROL_USER"){
        reservationModel.findById(id, (err, reservationFound) => {
            if(err){
                warnings.message_500(res)
            }else if(!reservationFound){
                warnings.message_404(res, 'reservation')
            }else{
                if(reservationFound.user.toString() === user.sub){
                    reservationModel.findByIdAndDelete(id, (err, reservationDeleted) => {
                        if(err){
                            warnings.message_500(res)
                        }else if(!reservationDeleted){
                            warnings.message_404(res, 'reservation')
                        }else{
                            res.status(200).send(reservationDeleted)
                        }
                    })
                }else{
                    warnings.message_custom(res, 'Sorry you can not delete a reservation that is not yours')
                }
            }
        })
    }else{
        warnings.message_401(res)
    }

}
async function getAllReservations(req, res){
    const user = req.user;
    if(user.rol === "ROL_ADMINHOTEL"){
        reservationModel.find({hotel: user.sub}, (err, reservations) => {
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
async function getAllMyReservations(req, res){
    const user = req.user;
    recipeModel.find({user: user.sub}, (err, reservations) => {
        if(err){
            warnings.message_500(res)
        }else if(!reservations){
            warnings.message_404(res, 'reservations')
        }else{
            res.status(200).send(reservations)
        }
    })
}
const calcTotal = (item) => {
    let total = 0;
    item.map(obj => {
        total += Number(obj.subTotal);
    })
    return total.toFixed(2);
}


module.exports = { createReservation, updateReservation, deleteReservation, getAllMyReservations, getAllReservations } 