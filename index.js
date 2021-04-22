const bodyParser = require('body-parser')
const app = require('express')();
const morgan = require('morgan')
const dbService = require('./src/services/db/db.service');
const port = 3000;
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/users.routes');
const hotelRoutes = require('./src/routes/hotel.routes')
const roomRoutes = require('./src/routes/room.routes')
const TEvent = require('./src/routes/TypeOfEvent.routes')
const createDefault = require('./src/controllers/auth/auth.controller')
// MiddleWares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/hotel', hotelRoutes)
app.use('/room', roomRoutes)
app.use('/TEvent', TEvent)
// Views
app.set('view engine', 'ejs');
app.set('views', './src/utils/views');
// Run App
const startAPP = (port) => {
    dbService.connectToDB().then(response => {
        console.log(response)
        createDefault.createDefault({
        name: 'Admin',
        email: 'admin@admin.com',
        username: 'ADMIN',
        password: '123456'
        })
        app.listen(port, () => {
            console.log(`Listening in port ${port}`)
        })
    }).catch(error => {
        console.error('Jmmmmm we can not connect to Mongo, Please check your database')
        console.log('Retrying in 3 seconds')
        setTimeout(() => {
            startAPP(port)
        }, 3000)
    })
}

startAPP(port)
