require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes.js')

const app = express()

app.use(express.json());

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });

app.use('/auth', authRoute)



app.listen(port, () => console.info(`App listening on port ${port}`))