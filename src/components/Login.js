import React, { useState } from "react";
import { post } from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    post("http://localhost:7373/api/auth/login", payload)
      .then((response) => {
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Incorrect password",
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
          <h4 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Log-in to your account</h4>
        </div>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <small>New to us? <a href="/register">Sign Up</a></small>
        </div>
      </div>
    </div>
  );
}

export default Login;