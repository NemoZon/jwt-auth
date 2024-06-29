const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const process = require('process')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router')
const errorMiddleware = require('./middlewares/error.middleware')

dotenv.config({ path: '.env.local' })
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware) // error middleware must be always last at list

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log('Server started http://localhost:' + PORT))
        console.log(process.env.CLIENT_URL)
    } catch (error) {
        console.log(error);
    }
}

start()