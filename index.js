const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();
const router = require('./router')
const mongoose = require('mongoose');
const cors = require('cors');


//DB SETUP
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on", port);

