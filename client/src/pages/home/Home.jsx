import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./home.scss";

// API
import axios from "axios";
import Api from "../../api-link";
// ------------------------------------------------------------
const Home = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  // ------------------------------------------------------------
  // Functions
  function fetchVisitorIp() {
    let ip = "";
    axios.get("https://api.ipify.org/?format=json").then((result) => {
      ip = result.data.ip;
      fetchVisitorData(ip);
    });
  }
  function fetchVisitorData(ip) {
    axios.post(`${Api}/api/add-ip`, { ip: ip }).then((result) => {
      axios.post(`${Api}/api/add-visitor-data`);
    });
  }
  // ------------------------------------------------------------
  // Use Effects
  useEffect(() => {
    fetchVisitorIp();
  }, []);
  // ------------------------------------------------------------
  // JSX
  return (
    <div className="home-page">
      {user.signedIn && <h1>Welcome {user.firstName}</h1>}
      <h1>Home</h1>
      <div></div>
    </div>
  );
};

export default Home;
