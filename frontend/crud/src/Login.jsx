    import axios from "axios";
    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import toast from "react-hot-toast";
    function Login() {
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const Navigate = useNavigate();
      const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData);
    
        try {
          const response = await axios.post(
            `${process.env.REACT_BACKEND_URL}/api/users/login`,
            formData
          );
    
          if (response.data.success) {
            toast.success(response.data.message);
            // toast("Redirecting to home page");
            localStorage.setItem("token", response.data.token); 
            Navigate("/");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast("something went wrong in login");
        }
      };
      return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-35">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p>Don't Have an Account</p>
        <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</Link>
      </div>
    </div> 
      );
    }
    
    export default Login;
    
