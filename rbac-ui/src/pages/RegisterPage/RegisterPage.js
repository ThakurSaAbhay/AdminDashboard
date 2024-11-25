import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const [message, setMessage] = useState("");
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("https://admindashboard-jywc.onrender.com/api/roles"); // assuming you have an endpoint to fetch roles
                setRoles(response.data);
            } catch (err) {
                console.error(err);
                setMessage("Error fetching roles");
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        console.log(formData.role);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://admindashboard-jywc.onrender.com/api/register", formData);
            setMessage(response.data.message);
            navigate("/login"); 
        } catch (err) {
            setMessage(err.response?.data?.message || "Error registering user");
        }
    };

    return (
        <div className="containerx">
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                
                <label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="" disabled>
                Select Role
              </option>
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default RegisterPage;
