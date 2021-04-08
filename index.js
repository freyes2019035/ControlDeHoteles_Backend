const bodyParser = require('body-parser')
const app = require('express')();
const morgan = require('morgan')
const dbService = require('./src/services/db/db.service');
const port = 3000;
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/users.routes');
const hotelRoutes = require('./src/routes/hotel.routes')
const createDefault = require('./src/controllers/auth/auth.controller')
// MiddleWares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/hotel', hotelRoutes)
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
        console.error(error)
    })
}

startAPP(port)
