const roomModel = require('../../models/room.model');
const hotelModel = require('../../models/hotel.model')
const warnings = require('../../utils/warnings/warnings.message');
const e = require('express');

// CRUD
async function createRoom(req, res){
    const user = req.user;
    const {name, price, images, hotel} = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        const room = new roomModel();
        await hotelModel.findById(hotel, (err, hotelFound) => {
            if(hotelFound){
                room.name = name;
                room.price = price;
                room.images = images;
                room.hotel = hotel;
                room.creator = user.sub;
                roomModel.find({name: room.name, hotel: room.hotel}, (err, roomFound) => {
                    if(roomFound.length >= 1){
                        warnings.message_alreadyExists(res, 'room');
                    }else if(err){
                        warnings.message_500(res)
                    }else{
                        room.save(async (err, roomSaved) => {
                            if(err){
                                warnings.message_500(res);
                            }else{
                                res.status(200).send(roomSaved)
                            }
                        })
                    }
                })
            }else if(err){
                warnings.message_500(res)
            }else{
                warnings.message_404(res, 'hotel')
            }
        })
    }else{
        warnings.message_401(res);
    }
}
async function updateRoom(req, res){
    const user = req.user;
    const room_id = req.params.id;
    const body = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        roomModel.findByIdAndUpdate(room_id, body, {new: true}, (err, roomUpdated) => {
            if(err){
                warnings.message_500(res)
            }else{
                res.status(200).send(roomUpdated)
            }
        })
    }else{
        warnings.message_401(res)
    }
}
async function deleteRoom(req, res){
    const user = req.user;
    const room_id = req.params.id;
    if(user.rol === "ROL_ADMINAPP"){
        roomModel.findByIdAndDelete(room_id, (err, roomDeleted) => {
            if(err){
                warnings.message_500(res)
            }else{
                res.status(200).send(roomDeleted)
            }
        })
    }else{
        warnings.message_401(res)
    }
}
async function getRooms(req, res){
    roomModel.find({}, (err, rooms) => {
        if(err){
            warnings.message_500(res)
        }else{
            res.status(200).send(rooms)
        }
    })
}
async function getRoom(req, res){
    const id = req.params.id
    roomModel.find({_id: id}).exec((err, room) => {
        if(err){
            console.log(err)
            warnings.message_500(res)
            
        }else{
            res.status(200).send(room)
        }
    })
}

module.exports = {createRoom, updateRoom, deleteRoom, getRooms, getRoom}