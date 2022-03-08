const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
import { Dictionary } from 'dictionaryjs';


// book keeping of connected devices
let activeConnectionDict = new Dictionary();



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Whenever someone connnects this gets executed  
io.on("connection", function(socket) {
  // console.log( " user Connected id: " + socket.id);
  console.log(`client with id : ${socket.id} connected to apigateway`);

  activeConnectionDict.set(socket.id, socket);
  console.log("number of client connected : ", activeConnectionDict.length);

  

  //Whenever someone disconnects this one gets executed
  socket.on("disconnect", function() {
    console.log("Client disconnected: ", socket.id);
  });
});

http.listen(3000, function () {
  console.log("listening on port: 3000");
});
