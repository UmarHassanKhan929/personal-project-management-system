const mongoose = require('mongoose')

const connectDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log(`mongo db connected ${conn.connection.host}`)
}

module.exports = connectDB