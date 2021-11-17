require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter) 

app.listen(1010, () => {
    console.log('App listening at http://localhost:1010')
})