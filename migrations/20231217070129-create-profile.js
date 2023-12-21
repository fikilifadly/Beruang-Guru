"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Profiles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			gender: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			dob: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Profiles");
	},
};
