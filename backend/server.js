//Inclusion of libraries --------------------------------------------------------
const http = require("http");
const express = require("express");
const app = express();
var path = require('path');
const { clear } = require("console");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const creds = require("./client_secret.json");
const { access } = require("fs");

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

//on client connection ----------------------------------------------------------
io.on("connection", function(socket) {

    var clientID = socket.id;
    var client = io.sockets.connected[clientID];

    console.log("Client connected with id: " + clientID);
    console.log();

    client.emit("clientConnected", clientID);

    updateData();

});

//getting data from spreadsheet -------------------------------------------------
async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet("1IOhzWwUbemfVOpKwRtYCo4kmZasP-3TZvnH9FaSLTbI");
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]

    try {
        const rows = await sheet.getRows();
        return rows;
    } catch (err) {
        console.log(err);
        console.log();
    }
}

function updateData() {
    accessSpreadsheet().then(function(data) {
        io.emit("updateData", data[0]._rawData);
        setTimeout(updateData, 10000);
    }).catch(function(err) {
        console.log(err)
        console.log();
    });
}
