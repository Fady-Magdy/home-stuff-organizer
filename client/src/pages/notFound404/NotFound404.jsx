import React from "react";
import { Link } from "react-router-dom";
import "./notFound404.scss";
const NotFound404 = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <Link to="/">
        <button>Go Back Home</button>
      </Link>
    </div>
  );
};

export default NotFound404;
