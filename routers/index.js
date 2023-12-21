const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

// middleware
const isLogin = (req, res, next) => {
	const { userId, RoleId } = req.session;

	if (userId && RoleId) {
		return res.redirect("/");
	}

	next();
};
const profile = (req, res, next) => {
	const { userId, RoleId } = req.session;

	if (!userId) {
		res.redirect("/?error=Silahkan Login Terlebih Dahulu");
	}
	next();
};

router.get("/", Controller.homePage);

router.get("/login", isLogin, Controller.login);
router.post("/login", Controller.loginProcess);

// setelah register create table profile yang isinya sesuai dengan register
router.get("/register", isLogin, Controller.register);
router.post("/register", Controller.registerProcess);

router.get("/profile", profile, Controller.profile);
router.post("/profile", profile, Controller.profileProcess);
router.get("/profile/add/:id", profile, Controller.profilCourse);

router.get("/logout", Controller.logout);

//admin
router.use(function (req, res, next) {
	console.log("admin: ", req.session);

	const { userId, RoleId } = req.session;
	if (userId && RoleId == 2) {
		next();
	} else {
		return res.redirect("/");
	}
});
router.get("/admin", Controller.admin);
router.get("/admin/courses", Controller.adminCourses);
router.get("/admin/courses/add", Controller.adminCoursesAdd);
router.post("/admin/courses/add", Controller.adminCoursesAddProcess);
router.get("/admin/courses/:id/edit", Controller.adminCoursesEdit);
router.post("/admin/courses/:id/edit", Controller.adminCoursesEditProcess);
router.get("/admin/courses/:id/delete", Controller.adminCoursesDelete);

module.exports = router;
