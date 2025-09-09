import React, { useState } from "react";
import axios from "axios";
import signuppic from "../image/singup.jpg";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import toast from "react-hot-toast";
import "../css/register.css";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        username,
        email,
        phone,
        password,
        address,
        answer,
      });
      if (res) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title="Register - Ecommer App">
        <div className="container mt-5 mb-5 d-flex align-items-center justify-content-center">
          <div className="row w-75 shadow-lg p-4 rounded bg-white">
            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center" >
              <h1 className="text-center mb-4 text-black">Create an Account</h1>
              <form onSubmit={handleSubmit} className="w-100">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="username"
                    className="form-control border-black text-black"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Full Name"
                 
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="email"
                    id="email"
                    className="form-control border-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                  
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="text"
                    id="phone"
                    className="form-control border-black"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Phone Number"
                  
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control border-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  
                  />
                </div>

                <div className="form-group mb-3">
                  <textarea
                    id="address"
                    className="form-control border-black"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="2"
                    required
                    placeholder="Address......"
                  
                  ></textarea>
                </div>

                <div className="form-group mb-4">
                  <textarea
                    id="answer"
                    className="form-control border-black"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows="2"
                    required
                    placeholder="Security Answer....."
                  
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary  w-100">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={signuppic} alt="Signup" className="img-fluid rounded shadow-sm"  />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
