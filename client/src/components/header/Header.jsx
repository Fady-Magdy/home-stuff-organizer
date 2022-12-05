import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="left">Header</div>
      <div className="right">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-item">New Item</Link>
          </li>
          <li>
            <Link to="/new-item">Home 222</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
