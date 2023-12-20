class Controller {
	static async homePage(req, res) {
		try {
			res.render("layout", {});
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}
}

module.exports = Controller;
