import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./register.scss";

// API
import axios from "axios";
import Api from "../../api-link";

//  Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
// ------------------------------------------------------------
const Register = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const conformPasswordRef = useRef(null);
  const emailIsUsed = useRef(false);

  const newUser = useRef({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const demoUserData = {
    email: "demo-user@gmail.com",
    password: "123123123",
  };
  // ------------------------------------------------------------
  // Use Effects
  useEffect(() => {
    if (user.signedIn) {
      navigate("/");
    }
  }, [user.signedIn]);
  // ------------------------------------------------------------
  // Functions
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
    axios
      .post(`${Api}/api/users/check-email`, {
        userEmail: newUser.current.email,
      })
      .then((result) => {
        if (result.data === "not used") {
          emailIsUsed.current = false;
        } else {
          emailIsUsed.current = true;
        }
      });
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
    } else if (emailIsUsed.current) {
      emailParent.querySelector(".message").innerText = "Email is used";
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

    axios.post(`${Api}/api/users/new`, dataToSend).then((result) => {
      if (result.data === "success") navigate("/login");
    });
  }

  function loginToDemoUser() {
    axios.post(`${Api}/api/users/login`, demoUserData).then((result) => {
      localStorage.setItem("hso-userId", JSON.stringify(result.data._id));
      navigate("/");
      window.location.reload();
    });
  }
  // ------------------------------------------------------------
  // JSX
  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <hr />
        {/* --------------------------------------------------- */}
        {/* First Name */}
        <div className="input-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            ref={firstNameRef}
            onChange={changeValues}
          />
          <p className="message"></p>
          <FaIcon icon={FA.faCircleExclamation} />
        </div>
        {/* --------------------------------------------------- */}
        {/* Last Name */}
        <div className="input-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            ref={lastNameRef}
            onChange={changeValues}
          />
          <p className="message"></p>
          <FaIcon icon={FA.faCircleExclamation} />
        </div>
        {/* --------------------------------------------------- */}
        {/* Email */}
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            onChange={changeValues}
          />
          <p className="message"></p>
          <FaIcon icon={FA.faCircleExclamation} />
        </div>
        {/* --------------------------------------------------- */}
        {/* Password */}
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={changeValues}
          />
          <p className="message"></p>
          <FaIcon icon={FA.faCircleExclamation} />
        </div>
        {/* --------------------------------------------------- */}
        {/* Confirm Password */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            ref={conformPasswordRef}
            onChange={changeValues}
          />
          <p className="message"></p>
          <FaIcon icon={FA.faCircleExclamation} />
        </div>
        {/* --------------------------------------------------- */}
        <button className="register-btn" onClick={createAccount}>
          <FaIcon icon={FA.faSquarePlus} />
          <span>Create Account</span>
        </button>
        <p className="demo-user-text">
          Or user <button onClick={loginToDemoUser}>Demo user</button>
        </p>
        <p className="have-account">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
