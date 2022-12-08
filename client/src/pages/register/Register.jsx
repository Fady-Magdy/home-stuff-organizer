import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Api from "../../api-link";

const Register = () => {
  const navigate = useNavigate();
  const newUser = useRef({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const conformPasswordRef = useRef(null);

  function changeValues(e) {
    let input = e.target;
    let parent = input.parentElement;
    let message = parent.querySelector(".message");
    newUser.current[input.id] = input.value;
    if (input.value === "") {
      message.innerText = `${input.placeholder} is required`;
      parent.classList.add("red");
      return;
    } else {
      parent.classList.remove("red");
    }
  }

  function createAccount() {
    let firstNameParent = firstNameRef.current.parentElement;
    let lastNameParent = lastNameRef.current.parentElement;
    let emailParent = emailRef.current.parentElement;
    let passwordParent = passwordRef.current.parentElement;
    let ConfirmPasswordParent = conformPasswordRef.current.parentElement;

    // check first name
    if (newUser.current.firstName === "") {
      firstNameParent.querySelector(".message").innerText =
        "First Name is required";
      firstNameParent.classList.add("red");
      return;
    } else {
      firstNameParent.classList.remove("red");
    }

    // check last name
    if (newUser.current.lastName === "") {
      lastNameParent.querySelector(".message").innerText =
        "Last Name is required";
      lastNameParent.classList.add("red");
      return;
    } else {
      lastNameParent.classList.remove("red");
    }

    // check email
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (newUser.current.email === "") {
      emailParent.querySelector(".message").innerText = "Email is required";
      emailParent.classList.add("red");
      return;
    } else if (!newUser.current.email.match(emailRegex)) {
      emailParent.querySelector(".message").innerText =
        "Email is incorrect, e.g (someone@gmail.com)";
      emailParent.classList.add("red");
      return;
    } else {
      emailParent.classList.remove("red");
    }

    // check password
    if (newUser.current.password === "") {
      passwordParent.querySelector(".message").innerText =
        "Password is required";
      passwordParent.classList.add("red");
      return;
    } else if (newUser.current.password.length < 8) {
      passwordParent.querySelector(".message").innerText =
        "Password should be 8 characters or more";
      passwordParent.classList.add("red");
      return;
    } else {
      passwordParent.classList.remove("red");
    }

    // check confirm Password
    if (newUser.current.password !== newUser.current.confirmPassword) {
      ConfirmPasswordParent.classList.add("red");
      ConfirmPasswordParent.querySelector(".message").innerText =
        "Password not Matching";
      return;
    } else {
      ConfirmPasswordParent.classList.remove("red");
    }
    // ---------------------------------------------------------
    // if all data is correct codes below will run
    let dataToSend = {
      firstName: newUser.current.firstName,
      lastName: newUser.current.lastName,
      email: newUser.current.email,
      password: newUser.current.password,
    };

    axios.post(`${Api}/api/add-new-user`, dataToSend).then(() => {
      newUser.current = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    });
    navigate("/login");
  }
  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <hr />
        <div className="input-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            ref={firstNameRef}
            onChange={changeValues}
          />
          <p className="message">No issue</p>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            ref={lastNameRef}
            onChange={changeValues}
          />
          <p className="message">No issue</p>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            onChange={changeValues}
          />
          <p className="message">No issue</p>
          <FontAwesomeIcon icon={faCircleExclamation} />
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
          <p className="message">No issue</p>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            ref={conformPasswordRef}
            onChange={changeValues}
          />
          <p className="message">No issue</p>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <button className="register-btn" onClick={createAccount}>
          Create Account
        </button>
        <p className="have-account">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
