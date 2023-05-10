const mongoose = require('mongoose')
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectToDb = ()=>{
mongoose.connect('mongodb://localhost:27017/my_store')
    .then((connect) => { 
        
        console.log('connected to ', connect.connection.host, connect.connection.name); })
    .catch((err) => { console.error(err); })}

    module.exports = connectToDb;