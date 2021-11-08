var socket = io.connect("localhost:3333", {secure: true});

socket.on("clientConnected", function(id) {
    console.log("Connected to server with id: " + id);
});

socket.on("updateData", function(data) {
    players = data;
    for(let i=0; i<5; i++) {
        if(app.$children[i].players!=undefined) {
            app.$children[i].players = players;
            break;
        }
    }
})