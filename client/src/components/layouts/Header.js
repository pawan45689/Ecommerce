import React from "react";
import logo from "../image/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { Badge } from "antd";
import { CgProfile } from "react-icons/cg";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light b"
      style={{
        background: "linear-gradient(135deg, #f0c27b, #4b1248)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        color: "white",
      }}
    >
      <Link className="navbar-brand" to="/">
        <img
          src={logo}
          alt="logo"
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
             Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/contact">
              Contact Us
            </NavLink>
          </li>
          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
             
              <li className="nav-item">
                <button className="nav-link text-white" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link d-flex align-items-center text-white"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  <CgProfile size={28} className="me-1" /> Profile
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-item mt-1 me-5">
            <Badge count={cart?.length || 0} offset={[10, 0]} showZero>
              <NavLink className="nav-link text-white" to="/cart">
                Cart
              </NavLink>
            </Badge>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
