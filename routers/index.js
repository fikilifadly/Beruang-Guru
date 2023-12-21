const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get("/", Controller.homePage);
router.get("/login", Controller.login);
router.post("/login", Controller.loginProcess);
// router.get("/register", Controller.register);
// router.post("/register", Controller.registerProcess);

module.exports = router;
