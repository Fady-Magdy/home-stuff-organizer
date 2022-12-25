import React from "react";
import { Link } from "react-router-dom";
import "./notFound404.scss";
const NotFound404 = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="texts">
          <h1>404</h1>
          <p>The page you are looking for is not found</p>
        </div>
        <Link to="/">
          <button className="back-home">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
