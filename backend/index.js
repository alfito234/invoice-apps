import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/database.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", invoiceRoutes);
app.use("/api", productRoutes);

db.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
