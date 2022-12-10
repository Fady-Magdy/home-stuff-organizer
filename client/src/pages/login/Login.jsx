import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import axios from "axios";
import Api from "../../api-link";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const loginData = useRef({
    email: "",
    password: "",
  });
  const userSignedIn = useSelector((state) => state.user.signedIn);
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (userSignedIn) {
      navigate("/");
    }
  }, [userSignedIn]);
  function changeValues(e) {
    let input = e.target;
    loginData.current[input.id] = input.value;
  }

  function login() {
    axios.post(`${Api}/api/users/login`, loginData.current).then((result) => {
      if (result.data === "not found") {
        messageRef.current.style.display = "inline-block";
      } else if (result.data === "password wrong") {
        messageRef.current.style.display = "inline-block";
      } else {
        localStorage.setItem("hso-userId", JSON.stringify(result.data._id));
        messageRef.current.style.display = "none";
        navigate("/");
        window.location.reload();
      }
    });
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Login</h2>
        <hr />
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            onChange={changeValues}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={changeValues}
          />
        </div>
        <p ref={messageRef} className="login-message">
          Email or Password is incorrect
        </p>
        <button className="register-btn" onClick={login}>
          <FontAwesomeIcon icon={faRightToBracket} />
          <span>Login</span>
        </button>
        <p className="have-account">
          Don't have an account? <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
