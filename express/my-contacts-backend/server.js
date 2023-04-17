const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require('dotenv').config()

connectDb()
const app = express()


const PORT = process.env.PORT || 5001

// built-in middle ware for parsing datastream from client
app.use(express.json())

app.use('/api/contacts', require('./routes/contactRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)



app.listen(PORT, () => {

    console.log("Server up and running on port", PORT);
})