const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, Course, Category, Profile, UserCourse } = require("../models");

class Controller {
	static async homePage(req, res) {
		console.log(req.session);

		try {
			let { userId } = req.session;
			const { error } = req.query;
			const course = await Course.findAll();

			if (!userId) {
				userId = false;
			}

			res.render("layout", {
				body: "homepage",
				userId,
				course,
				error,
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async login(req, res) {
		try {
			let { userId } = req.session;
			const { error } = req.query;

			if (!userId) {
				userId = false;
			}

			res.render("layout", {
				body: "login",
				userId,
				error,
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

				console.log("password: ", isValidPassword);

				if (isValidPassword) {
					req.session.userId = data.id;
					req.session.RoleId = data.RoleId;
					if (data.RoleId === 2) {
						res.redirect("/admin");
					} else {
						res.redirect("/");
					}
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

	static async register(req, res) {
		try {
			let { userId } = req.session;

			if (!userId) {
				userId = false;
			}

			res.render("layout", {
				body: "register",
				userId,
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async registerProcess(req, res) {
		try {
			await User.create(req.body);

			res.redirect("/login");
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async logout(req, res) {
		try {
			req.session.destroy();

			res.redirect("/");
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async profile(req, res) {
		try {
			const { userId } = req.session;
			const { message } = req.query;

			const data = await Profile.findOne({
				where: {
					UserId: {
						[Op.eq]: userId,
					},
				},
			});

			const user = await User.findOne({
				where: {
					id: {
						[Op.eq]: userId,
					},
				},
				include: Course,
			});

			console.log("data: ", data, "====", "user: ", user);

			res.render("layout", {
				data,
				body: "profile",
				userId,
				message,
				user,
		})
		} catch (error) {
			console.log(error);
			// res.send(error);
		}
	}

	static async profileProcess(req, res) {
		try {
			const { userId } = req.session;

			await Profile.update(req.body, {
				where: {
					UserId: {
						[Op.eq]: userId,
					},
				},
				individualHooks: true,
			});

			res.redirect("/profile?message=Success Update Profile");
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async profilCourse(req, res) {
		try {
			const { userId } = req.session;
			const { id } = req.params;

			if (!userId) {
				res.redirect("/profile?message=Login untuk enroll course");
			}

			const userCourse = await UserCourse.findOne({
				where: {
					UserId: {
						[Op.eq]: userId,
					},
					CourseId: {
						[Op.eq]: +id,
					},
				},
			});

			if (!userCourse) {
				await UserCourse.create({
					UserId: userId,
					CourseId: +id,
				});

				res.redirect("/profile");
			} else {
				res.redirect("/profile?message=anda sudah enrol materi tersebut");
			}
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	// admin
	static async admin(req, res) {
		try {
			const courses = await Course.findAll();
			const users = await User.findAll({
				where: {
					RoleId: {
						[Op.eq]: 1,
					},
				},
			});

			res.render("layoutadmin", {
				body: "homeadmin",
				courses,
				users,
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async adminCourses(req, res) {
		try {
			const { search, sort } = req.query;

			const data = await Course.getDataBySearchOrAndSort({ include: Category, search, sort });
			console.log("obj: ", data);

			res.render("layoutadmin", {
				body: "admin/courses",
				data,
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async adminCoursesAdd(req, res) {
		try {
			const category = await Category.findAll();
			console.log(category);

			res.render("layoutadmin", {
				body: "admin/coursesform",
				category,
				data: false,
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async adminCoursesAddProcess(req, res) {
		try {
			await Course.create(req.body);
			res.redirect("/admin/courses");
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async adminCoursesEdit(req, res) {
		try {
			const { id } = req.params;
			const data = await Course.findOne({
				include: Category,
				where: {
					id: +id,
				},
			});
			const category = await Category.findAll();

			console.log(data);
			console.log(category);

			res.render("layoutadmin", {
				body: "admin/coursesform",
				category,
				data,
			});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async adminCoursesEditProcess(req, res) {
		try {
			const { id } = req.params;
			await Course.update(req.body, {
				where: {
					id: +id,
				},
			});

			res.redirect("/admin/courses");
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}

	static async adminCoursesDelete(req, res) {
		try {
			const { id } = req.params;
			await Course.destroy({
				where: {
					id: +id,
				},
			});

			res.redirect("/admin/courses");
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}
}

module.exports = Controller;
