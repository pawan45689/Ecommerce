import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import toast from "react-hot-toast";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot", {
     
        email,
        answer,
        newpassword
       
      });
      if (res && res.data.success) {
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
      <Layout title="Register- Ecommer App">
        <div className="container d-flex align-items-center justify-content-center my-5 py-5">
          <div className="card p-4 shadow">
            <h2 className="text-center">Forgot Password!</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label>Answer </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  placeholder="Enter your answer"
                />
              </div>
              <div>
                <label>New Password</label>
                <input
                  type="password"
                  value={newpassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="text-center mt-1">
                <button type="submit" className="btn btn-primary w-100">
                 Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Forgotpassword;
