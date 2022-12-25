import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.scss";

//  Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";
// ------------------------------------------------------
const Header = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  const userStatus = useSelector((state) => state.user.status);
  const accountActive = useSelector((state) => state.user.accountActive);
  const searchValueRef = useRef("");
  const [foundItems, setFoundItems] = useState([]);
  // ---------------------------------------------------
  // functions
  const logout = () => {
    localStorage.removeItem("hso-userId");
    window.location.reload();
    Navigate("/");
  };
  const searchItem = (e) => {
    searchValueRef.current = e.target.value.toLowerCase();
    if (searchValueRef.current === "") {
      setFoundItems([]);
    }
    let newFoundItems = [];
    user.homeItems.map((room) => {
      room.roomContainers.map((container) => {
        container.containerItems.map((item) => {
          if (
            searchValueRef.current !== "" &&
            item.itemName.toLowerCase().includes(searchValueRef.current)
          ) {
            newFoundItems.push({
              itemName: item.itemName,
              containerName: container.containerName,
              roomName: room.roomName,
            });
          }
        });
      });
    });
    setFoundItems(newFoundItems);
  };
  const clearInput = () => {
    searchValueRef.current = "";
    setFoundItems([]);
  };
  // ---------------------------------------------------
  // Use Effects
  useEffect(() => {
    if (searchValueRef.current === "") {
      setFoundItems([]);
    }
  }, [foundItems.length]);
  // ---------------------------------------------------
  // JSX
  return (
    <header className="header">
      <div className="left">
        <Link className="title desktop" to="/">
          Home Stuff Organizer
        </Link>
        <Link className="title mobile" to="/">
          HSO
        </Link>
      </div>
      {accountActive && (
        <div className="center">
          <input
            onChange={searchItem}
            value={searchValueRef.current}
            type="text"
            placeholder="Quick find missing stuff"
          />
          <button onClick={clearInput} className="search-btn">
            <FaIcon icon={FA.faRemove} />
          </button>
          {foundItems.length > 0 && (
            <div className="search-result">
              <p className="found-items-count">
                Found <span className="count">{foundItems.length} </span>item
                {foundItems.length === 1 ? "" : "s"}
              </p>
              {foundItems.map((result, index) => {
                return (
                  <div key={index} className="found-item">
                    <hr />
                    <p>
                      Name: <span className="name">{result.itemName}</span>{" "}
                    </p>
                    <p className="location">
                      Room <span className="name">{result.roomName}</span> |
                      Container
                      <span className="name"> {result.containerName}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className="right">
        <ul>
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
        {accountActive && (
          <Link to="/profile/update-image">
            <div className="user-image">
              {userStatus === "pending" && <Loading />}
              <img
                src={require(`../../images/profile-image/${
                  user.profileImage || "default"
                }.png`)}
                alt="user"
              />
              <div className="edit">
                <FaIcon icon={FA.faEdit} />
              </div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
