require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes.js')
const taskRoute = require('./routes/taskRoutes.js')

const app = express()

app.use(express.json());

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });

app.use('/auth', authRoute);
app.use('/task', taskRoute);



app.listen(port, () => console.info(`App listening on port ${port}`))