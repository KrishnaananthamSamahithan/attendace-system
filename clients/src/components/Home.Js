import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no token is found
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to the Attendance System</h2>
        <p className="mt-4 text-gray-600">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 mt-6 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
