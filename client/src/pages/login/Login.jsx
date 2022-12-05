import "./login.scss";
import axios from "axios";
import React from "react";
import Api from "../../api-link";
const login = () => {
  const newUser = {
    firstName: "Fady",
    lastName: "Magdy",
    email: "fady@gmail.com",
    password: "123123",
    homeItems: [],
  };
  function addNewUser() {
    axios
      .post(`${Api}/api/add-new-user`, newUser)
      .then((result) => console.log("User Added => ", result.data));
  }
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={addNewUser}>Login</button>
    </div>
  );
};

export default login;
