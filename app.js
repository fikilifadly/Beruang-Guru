const express = require("express");
const router = require("./routers");
const app = express();
const session = require("express-session");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
	session({
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: false,
		cookie: { secure: false, sameSite: true, maxAge: 60000 },
	})
);

app.use(router);

app.listen(5000, () => console.log("Running on Port 5000"));
