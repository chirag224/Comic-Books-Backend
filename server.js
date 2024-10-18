const express = require("express");
const connectDB = require("./config/db");
const comicBookRoutes = require('./routes/comicBookRoutes'); 
require('dotenv').config(); // load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(express.json());

// connect to the database
connectDB();

// define API routes
app.use('/api', comicBookRoutes);

// start the server and listen on the specified port
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
