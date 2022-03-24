//Import http
var http = require('http');
//Import express
var express = require('express');
//Import socket.io
var socketio = require('socket.io');

//Import dotenv
require('dotenv').config();

//Craete port variable
const port = process.env.PORT || 8080;

// Create express app
const app = express();

// Create app static folder path to directory client
app.use(express.static(`${__dirname}/../Client`));

// Create server
const server = http.createServer(app);
//create socket server
const io = socketio(server);

//Socket on connection
io.on('connection', (socket) => {
    console.log('New client connected');
    //Socket on disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    //Socket on new message
    socket.on('new message', (message) => {
        console.log(message);
        //Send message to all clients
        io.emit('new message', message);
    });
});

// Server on error
server.on('error', (error) => {
    console.error(error);
});

// Start server
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});