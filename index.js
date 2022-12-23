import express from "express";
import { connectDB } from "./DB/connection.js";
import * as indexRouter from "./modules/index.router.js";
import { userModel } from "./models/user.js";
import { productModel } from "./models/product.js";
const app = express();
const mainPath = "/api/v1/";
connectDB();
userModel.hasMany(productModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
productModel.belongsTo(userModel);
app.use(express.json());
app.use(`${mainPath}user`, indexRouter.userRouter);
app.use(`${mainPath}product`, indexRouter.productRouter);
app.use("*", (req, res) => {
  res.json({ message: "404 Page not found" });
});
app.listen(3000, () => {
  console.log("server run !!!!!!!!!!!!!!!!!");
});
