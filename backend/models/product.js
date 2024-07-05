import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  picture: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
});

export default Product;
