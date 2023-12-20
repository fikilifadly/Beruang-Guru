const express = require("express");
const router = require("./routers");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(router);

app.listen(5000, () => console.log("Running on Port 5000"));
