const express = require("express");
const router = require("./routers");
const app = express();
const session = require("express-session");
const Discord = require("discord.js");
// const easyinvoice = require("easyinvoice");
const fs = require("fs");

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

// const data = {
// 	logo: "https://plus.unsplash.com/premium_photo-1686514714138-51925a219605?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
// 	sender: {

// 	}
// };
// easyinvoice.createInvoice(data, function (result) {
// 	easyinvoice.print(result.pdf);
// });

// easyinvoice.createInvoice(data, function (result) {
// 	easyinvoice.download("myInvoice.pdf", result.pdf);
// 	//	you can download like this as well:
// 	//	easyinvoice.download();
// 	//	easyinvoice.download('myInvoice.pdf');
// });

app.listen(5000, () => console.log("Running on Port 5000"));
