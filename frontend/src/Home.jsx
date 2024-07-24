import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate(); 
  
  const apiUrl = `${process.env.REACT_BACKEND_URL}/api/users`;

  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      navigate('/login'); 
      toast.success('Logged out successfully');
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (confirmDelete) {
        const response = await axios.delete(`${apiUrl}/delete-account/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.data.success) {
          toast.success('Account deleted successfully');
          localStorage.clear();
          navigate('/login'); 
        } else {
          toast.error('Failed to delete account');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link> 
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to='/' className="nav-link" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/' className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to={`/profile/${user?._id}`} className="nav-link">Profile</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-warning w-100 mb-2 ms-1" onClick={handleLogOut}>Logout</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger w-100 ms-1" onClick={()=>handleDeleteAccount(user?._id)}>DeleteAccount</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
