const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();


// App Setup
app.use(morgan('combined'));
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on", port);

