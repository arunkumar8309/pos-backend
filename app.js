require("dotenv").config();
require("./src/database/db");
var crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const express = require("express");
// const formidableMiddleware = require('express-formidable');
const bodyParser = require("body-parser");
const users = require("./src/routes/users");
const signin = require("./src/routes/Signin");
const Product = require("./src/routes/ProductRoute");
const ProductAdd = require("./src/routes/ProductAddRoutes");
const UploadProduct = require("./src/routes/ProductUploadRouter");

const app = express();
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var cors = require("cors");
app.use("/profile", express.static("public/uploads"));

// app.use(formidableMiddleware());

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use("/users", users);

app.use("/", UploadProduct);

// app.use("/", express.static('UploadProduct'));

app.use("/", ProductAdd);

app.use("/auth", signin);

app.use("/", Product);

app.get("/", (req, res) => {
  res.status(200).send("Posdb Backend");
});

// Development code ****************

if (process.env.ENVIRONMENT_VARIABLE == "Development") {
  console.log("Development condition");
  const server = require("http").createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  // will only detect changes of insertion, updation and deletion on the /leads route
  io.of("/socket").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });
  });

  const port = process.env.PORT;

  server.listen(port, () => console.log(`listening on ${port}`));
}
