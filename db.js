const mongoose = require('mongoose')

//define MongoDB connection URL 

const mongoURL = 'mongodb://localhost:27017/hotels'

//setup MongoDB connection 

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Mongoose maintains a default object representing the MongoDB connection

const db = mongoose.connection;

// Define Event Listener for database connection
db.on('connected',() => {
    console.log('Connected to MongoDB Server')
});

db.on('error', (err) => {
    console.error('MongoDB connection error', err)
});

db.on('disconnected', () => {
    console.log('MongoDb disconnected')
});



module.exports = db;

