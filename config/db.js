const mongoose = require('mongoose');
require('dotenv').config(); // load environment variables from .env file

// function to connect to the database
const connectDB = async () => {
    try {
        // connect to MongoDB using the connection URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully"); // log success message
    } catch (error) {
        console.error("database connection failed", error.message); // log error message if connection fails
       
    }
};

module.exports = connectDB; // export the connectDB function
