const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv-safe").config();

const db = require("./database/config.js");
db.connect();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes")
app.use("/users", userRoutes);

module.exports = app;