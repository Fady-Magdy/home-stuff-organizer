import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPlus,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const userSignedIn = useSelector((state) => state.user.signedIn);

  function logout() {
    localStorage.removeItem("hso-userId");
    window.location.reload();
  }
  return (
    <header className="header">
      <div className="left">
        <Link to="/">Home Stuff Organizer</Link>
      </div>
      <div className="right">
        <ul>
          <li>
            <Link to="/items">
              <FontAwesomeIcon icon={faFile} />
              <span>Your Items</span>
            </Link>
          </li>
          <li>
            <Link to="/items/new">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Item</span>
            </Link>
          </li>
          {!userSignedIn && (
            <>
              <li>
                <Link to="/register">
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Register</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FontAwesomeIcon icon={faRightToBracket} />{" "}
                  <span>log in</span>
                </Link>
              </li>
            </>
          )}
          {userSignedIn && (
            <li>
              <Link onClick={logout} to="/">
                <FontAwesomeIcon icon={faRightFromBracket} />
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
