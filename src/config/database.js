const mongoose = require('mongoose')
require('dotenv').config()

async function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    console.log('database connected');
    // setTimeout(() => {
    //         console.log(mongoose.connection.host)
    //         console.log(mongoose.connection.name)
    // }, 2000);

}

module.exports = connectDB
