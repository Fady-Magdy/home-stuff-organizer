import React from "react";
import "./footer.scss";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <h1>Copyright © 2022, Fady Magdy</h1>
        <p>All right reserved</p>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Footer;
