const express = require('express');
const connectToDb = require('./config/dbConnection');



const PORT = 3000;
connectToDb();
const app = express();
const routes = require('./routes');
app.use(express.json());




// Register all routes
app.use('/api', routes);



//App Initialisation
app.listen(PORT, () => {
   
    console.log(`server up and running on port ${PORT} `);
})
