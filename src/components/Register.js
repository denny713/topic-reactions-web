import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { post } from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        post("http://localhost:7373/api/account", payload)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Registration successful!",
                });

                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });

                navigate('/');
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.error || "An error occurred.",
                });
            });
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4" style={{ width: "400px" }}>
                <div className="text-center mb-4">
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                        alt="React Logo"
                        style={{ width: "50px" }}
                    />
                    <h4 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Register your account</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text" style={{ borderRadius: "8px 0 0 8px" }}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your name"
                            style={{ borderRadius: "0 8px 8px 0" }}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text" style={{ borderRadius: "8px 0 0 8px" }}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="example@gmail.com"
                            style={{ borderRadius: "0 8px 8px 0" }}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text" style={{ borderRadius: "8px 0 0 8px" }}>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="********"
                            style={{ borderRadius: "0 8px 8px 0" }}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ borderRadius: "8px", backgroundColor: "#17a2b8", border: "none", color: "white" }}
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small>Already have an account? <a href="/">Sign In</a></small>
                </div>
            </div>
        </div>
    );
}

export default Register;