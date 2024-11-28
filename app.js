const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();



const fileController = require("./controllers/fileController");

const app = express();


app.use(cors());

// File upload route

router.get("/", (req, res) => {
    res.send("Welcome to the File Upload API!");
});
module.exports = app;
