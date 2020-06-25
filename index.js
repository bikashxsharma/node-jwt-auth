const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

// Imports from express
const app = express()


//connect to DB
mongoose.connect(process.env.MONGO_DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    console.log("DB CONNECTED!!")
  } else {
    console.log("DB connection error!")
  }
})

//Middlewares
app.use(express.json())

//route middlewares
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)


app.listen(3000, () => console.log("Server up and running!"))