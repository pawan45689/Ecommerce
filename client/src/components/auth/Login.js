import React, { useState } from "react";
import axios from "axios";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "../css/login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res.data.user && res.data.token) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password ");
    }
  };

  return (
    <Layout>
      <div className="container-fluid login">
        <div className=" card p-4 shadow bg-white/80 backdrop-blur-sm login-card text-white  " style={{height:"500px", width:"450px"}}>
          <h2 className="text-center ">Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mt-4">Email </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="mt-4">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
            <div className="text-center mt-5">
              <a href="/forgotpassword">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
