"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.event.belongsToMany(models.user, { through: "saved_event" });
    }
  }
  event.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      date: DataTypes.STRING,
      type: DataTypes.STRING,
      details: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "event",
    }
  );
  return event;
};
