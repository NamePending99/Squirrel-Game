var socket = io.connect("192.168.2.159:3333", {secure: true});

socket.on("clientConnected", function(id) {
    console.log("Connected to server with id: " + id);
});

socket.on("updateData", function(data) {
    var test_content = document.getElementById("page-content");

    test_content.innerHTML = `
        ${data[0]} ${data[1]}
    `
})