import { Router } from "express";
import * as product from "./controller/products.js";
const router = Router();

router.post("/addProduct", product.add);
router.get("/", product.allProducts);
router.get("/productsWithCondition", product.getProducts);
router.get("/products2WithCondition", product.getProducts2);
router.get("/products3WithCondition", product.getProducts3);
router.get("/:id", product.getProductById);
router.put("/:id", product.update);
router.delete("/:id", product.deleteProduct);
export default router;
