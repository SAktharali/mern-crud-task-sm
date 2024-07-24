import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const apiUrl = `${process.env.REACT_BACKEND_URL}/api/users`;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-profile/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/update-profile/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Profile update failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className="bg-white p-3 rounded w-35">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="text" value={formData.name} onChange={handleChange} placeholder='Enter your new name' name='name' className='form-control rounded-0' />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" value={formData.email} onChange={handleChange} placeholder='Enter your new email' name='email' className='form-control rounded-0' />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" value={formData.password} onChange={handleChange} placeholder='Enter a new password' name='password' className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
