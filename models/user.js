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
			User.hasOne(models.Profile, {
				foreignKey: "UserId",
			});
			// User.belongsToMany(models.Course, { through: models.UserCourse });
			User.belongsToMany(models.Course, { through: "UserCourse", foreignKey: "UserId" });

			// User.hasMany(models.UserCourse, {
			// 	foreignKey: "UserId",
			// });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Username Tidak Boleh Kosong" },
					notEmpty: { msg: "Username Tidak Boleh Kosong" },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						msg: "Input harus berupa Email",
					},
					notNull: { msg: "Username Tidak Boleh Kosong" },
					notEmpty: { msg: "Username Tidak Boleh Kosong" },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Username Tidak Boleh Kosong" },
					notEmpty: { msg: "Username Tidak Boleh Kosong" },
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
			if (!instance.RoleId) instance.RoleId = 1;
			instance.dataValues.password = hash;
		} catch (error) {
			console.log(error);
		}
	});

	User.afterCreate(async (instance, opt) => {
		try {
			console.log("instance: ", instance);

			await sequelize.models.Profile.create({ UserId: instance.id });
		} catch (error) {}
	});

	return User;
};
