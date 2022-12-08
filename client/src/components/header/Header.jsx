import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="left">Home Stuff Organizer</div>
      <div className="right">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-item">New Item</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
