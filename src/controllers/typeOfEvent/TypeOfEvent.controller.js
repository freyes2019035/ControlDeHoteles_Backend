const typeOfEventModel = require('../../models/TypeOfEvent.model');
const warnings = require('../../utils/warnings/warnings.message')

// CRUD
async function createTypeOfEvent(req,res){
    const user = req.user;
    const { name } = req.body;
    if(user.rol === "ROL_ADMINAPP"){
        const typeOfEvent = new typeOfEventModel();
        if(name){
            typeOfEventModel.find({name: name}, (err, typeOfEventFound) => {
                if(err){
                    warnings.message_500(res)
                }else if(typeOfEventFound.length >= 1){
                    warnings.message_alreadyExists(res, 'Type of event')
                }else{
                    typeOfEvent.name = name;
                    typeOfEvent.save((err, documents) => {
                        if(err){
                            warnings.message_500(res)
                        }else if(!documents){
                            warnings.message_500(res)
                        }else{
                            res.status(200).send(documents)
                        }
                    });
                }
            });
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}
async function updateTypeOfEvent(req, res){
    const user = req.user;
    const body = req.body;
    const id = req.params.id;
    if(user.rol === "ROL_ADMINAPP"){
        typeOfEventModel.findByIdAndUpdate(id, body, (err, typeOfEventUpdated) => {
            if(err){
                warnings.message_500(res)
            }else if(!typeOfEventModel){
                warnings.message_500(res)
            }else{
                res.status(200).send(typeOfEventUpdated)
            }
        });
    }else{
        warnings.message_401(res)
    }
}
async function deleteTypeOfEvent(req, res){
    const user = req.user;
    const id = req.params.id;
    if(user.rol === "ROL_ADMINAPP"){
        typeOfEventModel.findByIdAndRemove(id, {new:true},(err, typeOfEventDeleted) => {
            if(err){
                warnings.message_500(res)
            }else if(!typeOfEventDeleted){
                warnings.message_500(res)
            }else{
                res.status(200).send(typeOfEventDeleted)
            }
        })
    }else {
        warnings.message_401(res)
    }
}
async function getAllTypeOfEvents(req, res){
    typeOfEventModel.find({}, (err, toeFound) => {
        if(err){
            warnings.message_500(res)
        }else if(!toeFound){
            warnings.message_500(res)
        }else{
            res.status(200).send(toeFound)   
        }
    })
}
async function getTypeOfEvent(req, res){
    const id = req.params.id
    typeOfEventModel.findById(id, (err, toeFound) => {
        if(err){
            warnings.message_500(res)
        }else if(!toeFound){
            warnings.message_500(res)
        }else{
            res.status(200).send(toeFound)   
        }
    })
}


module.exports =  { createTypeOfEvent, updateTypeOfEvent, deleteTypeOfEvent, getAllTypeOfEvents, getTypeOfEvent }