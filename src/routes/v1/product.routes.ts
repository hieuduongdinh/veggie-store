import { Router } from "express"
import * as ProductController from "../../controllers/product.controller"
import { validateProduct } from "../../validations/product.validation"

const router = Router()

router.get("/", ProductController.getAllProducts)
router.get("/:id", ProductController.getProductById)
router.post("/", validateProduct, ProductController.createProduct)
router.put("/:id", validateProduct, ProductController.updateProduct)
router.delete("/:id", ProductController.deleteProduct)
router.get("/category/:category", ProductController.getProductsByCategory)

export default router

