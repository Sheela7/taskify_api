require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

//----- Importing My Routes Modules
const authRoutes = require('./routes/authRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const eventRoutes = require(`./routes/eventRoutes.js`);
const plannerRoutes = require(`./routes/plannerRoutes.js`);
const noteRoutes = require('./routes/noteRoutes.js');


const app = express();

app.use(express.json());

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

//----- ROUTES MIDDLEWARE
app.use('/', taskRoutes);
app.use('/auth', authRoutes);
app.use('/event', eventRoutes);
app.use('/note', noteRoutes);
app.use('/planner', plannerRoutes);


app.listen(port, () => console.info(`App listening on port ${port}`))