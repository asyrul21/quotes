const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const morgan = require("morgan");
// const { initializeApplication } = require("./config");
const http = require("http");
const socketIO = require("socket.io");
// event emitter
const events = require("events");
const EM = new events.EventEmitter();

// middlewares
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

console.log("NODE ENVIRONMENT: " + process.env.NODE_ENV);
const app = express();

// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// root
app.get("/", (req, res) => {
  res.send("QUOTES APP API is running");
});

// error middlewares
app.use(notFound);
app.use(errorHandler);

// initialise socket IO
const server = http.createServer(app);
const SocketIO = socketIO(server, {
  cors: {
    origin: process.env.SOCKET_IO_CLIENT_URL, // should be the client
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;
module.exports =
  process.env.NODE_ENV === "test"
    ? server.listen(
        PORT,
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      )
    : // wait for the database is loaded before starting listening
      server.listen(PORT, () => {
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        );
        SocketIO.on("connection", (socket) => {
          console.log("Client connected successfully.");
          socket.emit("serverReady");
          // disconnection
          socket.on("disconnect", () => {
            console.log("Client disconnected.");
          });
        });
      });
