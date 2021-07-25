const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const PORT = process.env.PORT || 8080;
let connectedUsers = [];

app.set("view engine", "ejs");
app.use(express.static("public"));

// join page
app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

// page to get user video and audio information
app.get("/:room", (req, res) => {
  res.render("join", { roomId: req.params.room });
});

// page to allow users to connect
app.get("/:room/chat", (req, res) => {
  res.render("room", { roomId: req.params.room }); //the object passes a variable to the view
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    let roomId = data.roomId
    let userId = data.userId
    socket.join(roomId); //join to room

    socket.to(roomId).broadcast.emit("user-connected",userId); //says to everybody user has connected and gives the id

    socket.on("chatMessage", ( msg ) => {

      socket.to(roomId).emit("message",msg);
    });

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId); //says to everybody user has disconnected and gives the id
    });
  });
});

  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });

