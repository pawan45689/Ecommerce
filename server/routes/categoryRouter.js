import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {  createCategoryController,deleteCategoryController,updatecategoryController } from "../controller/categoryController.js";
import {getAllCategories} from "../controller/categoryController.js";

const router = express.Router();
router.get("/get-category", getAllCategories);
router.delete("/delete-category/:id", requireSignIn, isAdmin,deleteCategoryController)
router.post( "/create-category", requireSignIn, isAdmin, createCategoryController);
router.put("/update-category/:id", requireSignIn, isAdmin,updatecategoryController)


export default router;
