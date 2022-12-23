import { sequelize } from "./../DB/connection.js";
import { DataTypes } from "sequelize";
export const productModel = sequelize.define("product", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price:{
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
