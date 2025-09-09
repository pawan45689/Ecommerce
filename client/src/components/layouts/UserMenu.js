import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: isActive ? "#e0f7fa" : "#ffffff",
    textDecoration: "none",
    padding: "10px",
    marginBottom: "8px",
    color: "#333",
    borderRadius: "8px",
  });

  return (
    <div className="text-center container">
      <div className="list-group dashboard-menu" style={{ padding: "16px", borderRadius: "12px" }}>
        <h2 style={{ color: "#2563eb", marginBottom: "16px" }}>User Panel</h2>

        <NavLink to="order" style={linkStyle}>
          <span className="material-icons" style={{ marginRight: "8px", color: "#2196f3" }}>shopping_cart</span>
          Orders
        </NavLink>

        <NavLink to="profile" style={linkStyle}>
          <span className="material-icons" style={{ marginRight: "8px", color: "#ff9800" }}>edit</span>
          Edit Profile
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
