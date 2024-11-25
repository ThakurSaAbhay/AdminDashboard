import React, { useState, useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./loginPage.css"; 

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://admindashboard-jywc.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            localStorage.setItem("token", data.token);
            console.log(data.token);
            setAuth({ isAuthenticated: true, role: data.role });
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="containerx">
            
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <Link to="/register" style={{color:"black",textDecoration:"none", padding:"10px",fontSize:"15px",textAlign:"center"}}>Not Registerd yet? click here</Link>
            </form>
        </div>
        </div>
        );
};

export default LoginPage;
