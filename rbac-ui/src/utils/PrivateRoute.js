import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      setAuth({ isAuthenticated: false });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://admindashboard-jywc.onrender.com/api/verify-token", { token });
      if (response.data.valid) {
        setAuth({ isAuthenticated: true });
      } else {
        setAuth({ isAuthenticated: false });
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      setAuth({ isAuthenticated: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while verifying
  }

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
