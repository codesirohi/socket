const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
import { Dictionary } from "dictionaryjs";
// import express, { Request, Response } from 'express';
const port = 3000;

// book keeping of connected devices
let activeConnectionDict = new Dictionary();

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
  
});

//Whenever someone connnects this gets executed
io.on("connection", (socket) => {
  // console.log( " user Connected id: " + socket.id);
  console.log(`client with id : ${socket.id} connected to apigateway`);

  activeConnectionDict.set(socket.id, socket);
  console.log("number of client connected : ", activeConnectionDict.length);

  //Whenever someone disconnects this one gets executed
  socket.on("disconnect", function () {
    activeConnectionDict.remove(socket.id)
    console.log("Client disconnected: ", socket.id);
    console.log("number of client connected : ", activeConnectionDict.length);
  });
});

http.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
