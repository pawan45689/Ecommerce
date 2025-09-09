import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contactus";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Forgotpassword from "./components/auth/ForgotPassword";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrder from "./pages/Admin/AdminOrders";
import CreatCategory from "./pages/Admin/CreateCategory";
import CreateProducts from "./pages/Admin/CreateProducts";
import Product from "./pages/Admin/Products";
import UpdateProducts from "./pages/Admin/UpdateProduct";
import User from "./pages/Admin/User";

// Routes
import AdminPrivateRoute from "./components/Routes/AdminRoutes";
import PrivateRoute from "./components/Routes/Private";

// Other Pages
import ProductDetail from "./components/pages/Moredetail";
import CartPage from "./components/pages/CartPage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />

      {/* User Routes */}

     

      {/* Protected Routes */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/order" element={<Order />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>

      <Route path="/dashboard" element={<AdminPrivateRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/adminorders" element={<AdminOrder />} />
        <Route path="admin/createcategory" element={<CreatCategory />} />
        <Route path="admin/createproduct" element={<CreateProducts />} />
        <Route path="admin/product" element={<Product />} />
        <Route path="admin/product/:slug" element={<UpdateProducts />} />
        <Route path="admin/user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
