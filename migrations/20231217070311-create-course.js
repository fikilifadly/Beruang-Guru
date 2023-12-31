"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Courses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			title: {
				type: Sequelize.STRING,
			},
			desc: {
				type: Sequelize.STRING,
			},
			imageUrl: {
				type: Sequelize.STRING,
			},
			videoUrl: {
				type: Sequelize.STRING,
			},
			duration: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			CategoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Categories",
					},
					key: "id",
				},
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
		await queryInterface.dropTable("Courses");
	},
};
