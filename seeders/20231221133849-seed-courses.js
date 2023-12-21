"use strict";

const fs = require("fs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const data = JSON.parse(await fs.readFileSync("./data/courses.json", "utf-8")).map((el) => {
			el.createdAt = el.updatedAt = new Date();
			el.desc = el.desc.slice(0, 255);
			el.duration = Math.floor(Math.random() * (250 - 100 + 1) + 100);
			el.price = Math.floor(Math.random() * (100000 - 50000 + 1) + 50000);
			return el;
		});

		await queryInterface.bulkInsert("Courses", data, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await queryInterface.bulkDelete("Courses", null, {});
	},
};
