const serviceModel = require('../../models/services.model');
const hotelModel = require('../../models/hotel.model')
const warning = require('../../utils/warnings/warnings.message');
const e = require('express');

async function createService(req, res) {
    const service = new serviceModel();
    const user = req.user;
    const { name, price, description} = req.body;
    if(user.rol === "ROL_ADMINHOTEL"){
        if(name && price && description){
            serviceModel.find({name: name, description: description, hotel: user.sub}, (err, serviceFound) => {
                if(err){
                    warning.message_500(res)
                }else if(serviceFound.length >= 1){
                    warning.message_alreadyExists(res, 'service')
                }else{
                    service.name = name;
                    service.price = price;
                    service.description = description;
                    service.creator = user.sub;
                    service.hotel = user.sub;
                    service.save(async (err, service) => {
                        if(err){
                            warning.message_500(res)
                        }else if(!service){
                            warning.message_500(res)
                        }else{
                            res.status(200).send(service);
                        }
                    });
                }
            })
        }else{
            warning.message_400(res)
        }
    }else{
        warning.message_401(res)
    }

}
async function updateService(req, res){
    const body = req.body;
    const service_id = req.params.id;
    const user = req.user;
    if(user.rol === "ROL_ADMINHOTEL"){
        serviceModel.findById(service_id, (err, service) => {
            if(err){
                warning.message_500(res)
            }else if(!service){
                warning.message_404(res, 'service')
            }else{
                if(service.creator.toString() === user.sub && service.hotel.toString() === user.sub){
                    if(Object.entries(body).length >= 1){
                        delete body.creator;
                        delete body.hotel;
                        serviceModel.findOneAndUpdate(service_id, body, (err, serviceUpdated) => {
                            if(err){
                                warning.message_500(res)
                            }else if(!serviceUpdated){
                                warning.message_404(res, 'service')
                            }else{
                                res.status(200).send(serviceUpdated)
                            }
                        });
                    }else{
                        warning.message_400(res)
                    }
                }else{
                    warning.message_custom(res, 'Access Deniend !! You can not update a service that is not yours')
                }
            }
        });
    }else{
        warning.message_401(res)
    }
}
async function deleteService(req, res){
    const service_id = req.params.id;
    const user = req.user;
    if(user.rol === "ROL_ADMINHOTEL"){
        serviceModel.findById(service_id, (err, service) => {
            if(err){
                warning.message_500(res)
            }else if(!service){
                warning.message_404(res, 'service')
            }else{
                if(service.creator.toString() === user.sub && service.hotel.toString() === user.sub){
                    serviceModel.findOneAndDelete(service_id, (err, serviceDeleted) => {
                        if(err){
                            warning.message_500(res)
                        }else if(!serviceDeleted){
                            warning.message_404(res, 'service')
                        }else{
                            res.status(200).send(serviceDeleted)
                        }
                    });
                }else{
                    warning.message_custom(res, 'Access Deniend !! You can not delete a service that is not yours')
                }
            }
        });
    }else{
        warning.message_401(res)
    }
}
async function getAllServices(req, res){
    serviceModel.find({}, (err, services) => {
        if(err){
            warning.message_500(res)
        }else if(!services){
            warning.message_404(res, 'services')
        }else{
            res.status(200).send(services)
        }
    });
}
async function getService(req, res){
    const id = req.params.id;
    serviceModel.findById(id, (err, services) => {
        if(err){
            warning.message_500(res)
        }else if(!services){
            warning.message_404(res, 'services')
        }else{
            res.status(200).send(services)
        }
    });
}
module.exports = { createService, updateService, deleteService, getAllServices,getService }