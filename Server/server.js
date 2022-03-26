//Import http
var http = require("http");
//Import express
var express = require("express");
//Import socket.io
var socketio = require("socket.io");
const Player = require("./GameObjects/Player");

//Import dotenv
require("dotenv").config();

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

// make socket_list array
var socket_list = {};
// make player_list array
var player_list = {};

//Socket on connection
io.on("connection", (socket) => {
  // Assign random number to socket.id
  socket.id = Math.random();
  // socket list with the socket id equal to socket
  socket_list[socket.id] = socket;

  // Create new player
  var player = new Player({ socket_id: socket.id });
  // player list with socket id equal to player
  player_list[socket.id] = player;
  console.log("New client connected");

  //Socket on disconnect
  socket.on("disconnect", () => {
    // remove socket.id from socket_list
    delete socket_list[socket.id];
    // remove socket.id from player_list
    delete player_list[socket.id];
    console.log("Client disconnected");
  });
  //Socket on Direction
  socket.on("keyPress", (Direction) => {
    player.direction = Direction;
  });
});

// Server on error
server.on("error", (error) => {
  console.error(error);
});

// Start server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//interval to send message to all clients
setInterval(() => {
  // create variable pack equal to empty pack
  var pack = [];
  for (var i in player_list) {
    // create variable socket equal to socket_list[i]
    var player = player_list[i];

    // update player
    player.update();

    // add socket to pack
    pack.push({
      x: player.x,
      y: player.y,
    });
  }

  // for each client emit newPositions
  for (var i in socket_list) {
    // create variable socket equal to socket_list[i]
    var socket = socket_list[i];
    // emit newPositions to client
    socket.emit("newPositions", pack);
  }
}, 1000 / 25);
