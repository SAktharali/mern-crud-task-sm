import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    try {
      const api=`${process.env.REACT_BACKEND_URL}/api/users`;
      const response = await axios.post(
        api+"/register",
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {

      console.log(error);
      toast.error("something went wrong in registration");
    }
  };
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className="bg-white p-3 rounded w-35">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
<div className="mb-3">
<label htmlFor="name"><strong>Name</strong></label>
<input type="text" value={formData.name} onChange={handleChange} placeholder='enter your name' name='name'  className='form-control rounded-0' />
            </div>
<div className="mb-3">
<label htmlFor="email"><strong>Email</strong></label>
<input type="email" value={formData.email} onChange={handleChange} placeholder='enter your email' name='email'  className='form-control rounded-0' />
            </div>
<div className="mb-3">
<label htmlFor="password"><strong>Password</strong></label>
<input type="password" value={formData.password} onChange={handleChange} placeholder='enter your password' name='password'  className='form-control rounded-0' />
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'>Register</button>
            </form>
            <p>Already Have an Account</p>
            <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </div>
    </div>
  );
}
export default Register;
