const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Whenever someone connnects this gets executed
io.on("connection", function(socket) {
  console.log( " user Connected id: " + socket.id);

  //Whenever someone disconnects this one gets executed
  socket.on("disconnect", function() {
    console.log(" user disconnected ");
  });
});

http.listen(3000, function () {
  console.log("listening on port: 3000");
});
