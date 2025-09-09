import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  updateProfileController,
  getAllUsersController
} from "../controller/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController, requireSignIn, isAdmin);
router.post("/forgot", forgotPasswordController);
router.get("/test", requireSignIn, isAdmin, testController);
router.post("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Admin authentication route
router.post("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//order
router.get("/order", requireSignIn, getOrdersController);
//get all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
//orderstatus
router.put(
  "/order-staus/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
//update profile
router.put("/profile", requireSignIn, updateProfileController);
export default router;
//user
router.post("/all-users", requireSignIn, getAllUsersController);

