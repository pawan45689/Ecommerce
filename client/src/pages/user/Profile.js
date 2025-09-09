import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserMenu from "../../components/layouts/UserMenu";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  

  useEffect(() => {
    const { email, username, phone, address } = auth?.user || {};
    setUsername(username || "");
    setEmail(email || "");
    setPhone(phone || "");
    setAddress(address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        username,
        email,
        phone,
        address,
        
      });

      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
        navigate("/dashboard/user");
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        {/* Title */}
        <h1 className="text-center text-primary mb-4">Update Your Profile</h1>

        <div className="row">
          {/* Sidebar - Full width on mobile, left side on desktop */}
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card border-0 shadow-sm p-3">
              <UserMenu />
            </div>
          </div>

          {/* Profile Form - Stretches on big screens, stacks on small screens */}
          <div className="col-lg-8 col-md-7">
            <div className="card border-0 shadow-lg p-4">
              <h3 className="text-center text-secondary mb-3">Edit Profile</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                
                  <div className="mb-3">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                

                <div className="mb-3">
                  <label className="form-label fw-bold">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Profile;
