var socket = io.connect("localhost:3333", {secure: true});

socket.on("clientConnected", function(id) {
    console.log("Connected to server with id: " + id);
});