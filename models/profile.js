"use strict";
const { formatDate } = require("../helpers");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Profile extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Profile.belongsTo(models.User, {
				foreignKey: "UserId",
			});
		}

		get dateValue() {
			return formatDate(this.dob);
		}
	}
	Profile.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			gender: DataTypes.STRING,
			dob: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Profile",
		}
	);
	return Profile;
};
