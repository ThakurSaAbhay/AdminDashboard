import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/Dashboard";
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
    return (
        <div>
    <video autoPlay loop muted style={{ width: "100%", height: "100%", position: "fixed", top: "0", left: "0", objectFit: "cover", zIndex: "-1000" }}>
        <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
      </video> 
        <Routes>

            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                }
            /> 
        </Routes>
        </div>
       
    );
};

export default App;
