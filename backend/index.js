const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())
app.use(cors({ origin: process.env.FRONT_ORIGIN, credentials: true }))
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB 연결 성공')).catch((err) => console.log('연결 실패', err))

const userRoutes = require('./routes/user')
app.use('/api/auth', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.listen(PORT, () => {
    console.log(`Server is Running! → http://localhost:${PORT}`)
})