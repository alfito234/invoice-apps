import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Invoice = db.define("Invoice", {
  date: DataTypes.DATE,
  customerName: DataTypes.STRING,
  salespersonName: DataTypes.STRING,
  notes: DataTypes.TEXT,
  products: DataTypes.JSON,
  totalAmount: DataTypes.FLOAT,
});

export default Invoice;
