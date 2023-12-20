"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			RoleId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Roles",
					},
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
