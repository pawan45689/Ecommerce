import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
import formidable from "express-formidable";
import {
  creatProductcontroller,
  getAllProduct,
  deleteProductController,
  updateproductController,
  productPhotoControoller,
  getSingleProductController,
  productFilterController,
  productCountController ,
  productListController,
  braintreeTokenController,
  brainTreePaymentController
} from "../controller/productController.js";
router.get("/get-product", getAllProduct);
router.delete( "/delete-product/:id",requireSignIn, isAdmin,deleteProductController);
router.post( "/create-product", requireSignIn, isAdmin, formidable(), creatProductcontroller
);
router.put( "/update-product/:id", requireSignIn, isAdmin, formidable(), updateproductController);
router.get("/get-image/:id", productPhotoControoller);
router.get("/get-singleproduct/:slug", getSingleProductController);
router.post("/product-filter", productFilterController);
router.get("/product-count",  productCountController );
router.get("/product-list/:page",productListController)

//token
router.get("/braintree/token", braintreeTokenController);
//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
export default router;

