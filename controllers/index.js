const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User } = require("../models");

class Controller {
	static async homePage(req, res) {
		try {
			res.render("layout", {
				body: "homepage",
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async login(req, res) {
		try {
			res.render("layout", {
				body: "login",
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async loginProcess(req, res) {
		// step login
		// 1. findOne user berdasrkan email/username
		// 2. kalo user ada, compare password plain dengan hash password
		// 3. kalo gak sama gak boleh masuk form
		// 4. jika match redirect ke home

		try {
			const { email, password } = req.body;

			console.log(req.body);

			const data = await User.findOne({
				where: {
					email: {
						[Op.eq]: email,
					},
				},
			});

			if (data) {
				const isValidPassword = bcrypt.compareSync(password, data.password);

				if (isValidPassword) {
					res.redirect("/");
				} else {
					res.redirect("/login?error=Password Tidak Sesuai");
				}
			} else {
				res.redirect("/login?error=Email Tidak Terdaftar");
			}
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}
}

module.exports = Controller;
