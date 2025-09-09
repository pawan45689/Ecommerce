import userModel from "../models/usermodel.js";
import orderModel from "../models/orderModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  const { username, email, password, phone, address, answer } = req.body;
  if (!username || !email || !password || !phone || !address || !answer) {
    return res.status(422).json({ error: "plz fill the all field" });
  }
  try {
    const emailExist = await userModel.findOne({ email: email });
    if (emailExist) {
      return res.status(422).json({ error: "email already Exist" });
    }
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    const userregister = await user.save();
    if (userregister) {
      res.status(201).json({ message: "user register successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};
//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }
    const match = await comparePassword(password, user.password);
    console.log(match);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(token);
    res.status(200).json({
      message: "login successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};
//test controller
export const testController = (req, res) => {
  try {
    res.send("protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//forgotpassword
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newpassword) {
      res.status(400).send({ message: "newpassword is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
//Orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting orders",
      error,
    });
  }
};
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ creatdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error getting orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating order",
      error,
    });
  }
};
//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id); 

    console.log("Req User:", req.user); 

    // Password validation
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        email: email || user.email,
        password: hashedPassword ? hashedPassword : user.password, 
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Profile",
      error,
    });
  }
};
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      message: "All Users",
      users, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all Users",
      error: error.message,
    });
  }
};
