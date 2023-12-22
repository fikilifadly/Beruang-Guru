"use strict";
const { formatRupiah } = require("../helpers");
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Course.belongsTo(models.Category);
			// Course.belongsToMany(models.User, { through: models.UserCourse });
			Course.belongsToMany(models.User, { through: "UserCourse", foreignKey: "CourseId" });

			// Course.hasMany(models.UserCourse, {
			// 	foreignKey: "CourseId",
			// });
		}

		get priceValue() {
			return formatRupiah(this.price);
		}

		static getDataBySearchOrAndSort({ include, search, sort }) {
			let obj = { include };
			if (search && sort) {
				obj.order = [["price", `${sort}`]];
				obj.where = {
					title: {
						[Op.iLike]: `%${search}%`,
					},
				};
			} else if (search) {
				obj.where = {
					title: {
						[Op.iLike]: `%${search}%`,
					},
				};
			} else if (sort) {
				obj.order = [["price", `${sort}`]];
			}

			return this.findAll(obj);
		}
	}
	Course.init(
		{
			title: DataTypes.STRING,
			desc: DataTypes.STRING,
			imageUrl: DataTypes.STRING,
			videoUrl: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			CategoryId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Course",
		}
	);
	return Course;
};
