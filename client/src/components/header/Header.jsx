import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.scss";

//  Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
// ------------------------------------------------------
const Header = () => {
  // States
  const accountActive = useSelector((state) => state.user.accountActive);
  // ---------------------------------------------------
  // functions
  function logout() {
    localStorage.removeItem("hso-userId");
    window.location.reload();
  }
  // ---------------------------------------------------
  // JSX
  return (
    <header className="header">
      <div className="left">
        <Link to="/">Home Stuff Organizer</Link>
      </div>
      <div className="right">
        <ul>
          <li>
            <Link to="/items">
              <FaIcon icon={FA.faTabletScreenButton} />
              <span>Your Items</span>
            </Link>
          </li>
          {!accountActive && (
            <>
              <li>
                <Link to="/register">
                  <FaIcon icon={FA.faUserPlus} />
                  <span>Register</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FaIcon icon={FA.faRightToBracket} /> <span>log in</span>
                </Link>
              </li>
            </>
          )}
          {accountActive && (
            <li>
              <Link onClick={logout} to="/">
                <FaIcon icon={FA.faRightFromBracket} />
                <span>Log out</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
