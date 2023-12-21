"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasOne(models.Role);
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			RoleId: {
				type: DataTypes.INTEGER,
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

	User.beforeCreate(async (instance, opt) => {
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(instance.dataValues.password, salt);
			instance.dataValues.password = hash;
		} catch (error) {
			console.log(error);
		}
	});

	return User;
};
