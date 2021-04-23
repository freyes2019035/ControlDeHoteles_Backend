const eventModel = require('../../models/event.model')
const warnings = require('../../utils/warnings/warnings.message')
const moment = require('moment')

// CRUD
async function createEvent(req, res) {
    const { name, description, images ,typeOfEvent, hour, date, hotel } = req.body;
    const user = req.user;
    if(user.rol === "ROL_ADMINAPP"){
        if( name && description && images && typeOfEvent && hour && date && hotel  ){
            let event = new eventModel();
           await eventModel.find({name: name, typeOfEvent: typeOfEvent, hotel: hotel}, (err, eventFound) => {
                if(err){
                    warnings.message_500(res)
                }else if(eventFound.length >= 1){
                    warnings.message_alreadyExists(res, 'event')
                }else{
                    const currentTime = moment()
                    event.name = name;
                    event.description = description;
                    event.images = images;
                    event.typeOfEvent = typeOfEvent;
                    event.hour = hour;
                    event.date = date;
                    event.hotel = hotel;
                    event.creator = user.sub;
                    event.creation_date = currentTime;

                    event.save(async (err, eventSaved) => {
                        if(err){
                            console.log(err)
                            warnings.message_500(res)
                        }else if(!eventSaved){
                            console.log(eventSaved)
                            warnings.message_500(res)
                        }else{
                            res.status(200).send(eventSaved)
                        }
                    })
               }   
            });
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}
async function updateEvent(req, res){
    const body = req.body;
    const user = req.user;
    const id = req.params.id;
    if(user.rol === "ROL_ADMINAPP"){
        if(body && id){
            delete body.creation_date;
            delete body.creator;
           await eventModel.findByIdAndUpdate(id, body, (err, eventUpdated) => {
                if(err){
                    console.log(err)
                    warnings.message_500(res)
                }else if(!eventUpdated){
                    warnings.message_500(res)
                }else{
                    res.status(200).send({eventUpdated})
                }
            })
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}
async function deleteEvent(req, res){
    const user = req.user;
    const id = req.params.id;
    if(user.rol === "ROL_ADMINAPP"){
        if(id){
            await eventModel.findByIdAndDelete(id, (err, eventDeleted) => {
                if(err){
                    console.log(err)
                    warnings.message_500(res)
                    
                }else if(!eventDeleted){
                    console.log(err)
                    warnings.message_500(res)
                }else{
                    res.status(200).send({eventDeleted})
                }
            });
        }else{
            warnings.message_401(res)
        }
    }else{
        warnings.message_401(res)
    }
}
async function getAllEvents(req, res){
    await eventModel.find({}, (err, events) => {
        if(err){
            warnings.message_500(res)
        }else if(events.length < 1){
            warnings.message_custom(res, 'Sorry we do not found any event')
        }else{
            res.status(200).send(events)
        }
    });
}
async function getEvent(req, res){
    const id = req.params.id;
    await eventModel.find({_id: id}, (err, events) => {
        if(err){
            warnings.message_500(res)
        }else if(events.length < 1){
            warnings.message_custom(res, 'Sorry we do not found any event with that ID')
        }else{
            res.status(200).send(events)
        }
    });
}
async function getEventByHotel(req, res){
    const id = req.params.id;
    await eventModel.find({hotel: id}, (err, events) => {
        if(err){
            warnings.message_500(res)
        }else if(events.length < 1){
            warnings.message_custom(res, 'Sorry we do not found any event with that hotel ID')
        }else{
            res.status(200).send(events)
        }
    });
}

module.exports = { createEvent, updateEvent, deleteEvent, getAllEvents, getEvent, getEventByHotel }