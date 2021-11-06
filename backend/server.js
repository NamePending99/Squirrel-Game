//Inclusion of libraries --------------------------------------------------------
const http = require("http");
const express = require("express");
const app = express();
var path = require('path');
const { clear } = require("console");

//variables ---------------------------------------------------------------------
const serverPort = 3333;

const htmlPath = path.join(__dirname, '../frontend');

const server = http.createServer(app);
const io = require("socket.io").listen(server);

app.use(express.static(htmlPath));

//HTTPS Server
server.listen(serverPort, function() {
    console.log("listening on port: " + serverPort);
    console.log();
});

io.on("connection", function(socket) {

    var clientID = socket.id;
    var client = io.sockets.connected[clientID];

    console.log("Client connected with id: " + clientID);

    client.emit("clientConnected", clientID);
});