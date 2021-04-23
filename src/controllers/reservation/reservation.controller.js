const reservationModel = require('../../models/reservation.model');
const warnings = require('../../utils/warnings/warnings.message');
const moment = require('moment')
const serviceModel = require('../../models/services.model')
const roomModel = require('../../models/room.model')
async function createReservation(req, res){
    const user = req.user;
    const { dateOfArrive, dateOfDeparture, roomID, services, hotel} = req.body;
    if(user.rol === "ROL_USER"){
        if(dateOfArrive && dateOfDeparture && roomID && hotel){
            const reservation = new reservationModel();
            const dateOfReservation = moment().format('YYYY/MM/DD')
            const arrive = dateOfArrive;
            const departure = dateOfDeparture
            const noOfDaysOfStay = Math.ceil(Math.abs(new Date(dateOfArrive) - new Date(dateOfDeparture)) / (1000 * 60 * 60 * 24)) - 1; 
            const room = await roomModel.findById(roomID);
            const roomPrice = room.price;
            const lodging_hotel = hotel;
            const final_user = user.sub;
            const subTotalRoom =  (roomPrice * noOfDaysOfStay).toFixed(2);
            const subTotalServices =  reservation.subTotalServices;
            if(services){
                let services = ["60833d32210a5c11e7a18d7b","6083490548ed39176ae0fa34"];
                serviceModel.find()
                
                console.log(t)
            }
            res.send({
                dateOfReservation,
                arrive,
                departure,
                noOfDaysOfStay,
                roomPrice,
                subTotalRoom,
                subTotalServices,
                lodging_hotel,
                final_user
            })
        }else{
            warnings.message_400(res)
        }
    }else{
        warnings.message_401(res)
    }
}


const calcTotal = (item) => {
    let total = 0;
    item.map(obj => {
        total += Number(obj.subTotal);
    })
    return total.toFixed(2);
}

module.exports = { createReservation } 