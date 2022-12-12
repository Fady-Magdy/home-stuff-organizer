import React, { useEffect } from "react";
import axios from "axios";
import Api from "../../api-link";
import "./home.scss";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.userData);
  const userSignedIn = useSelector((state) => state.user.signedIn);

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

  useEffect(() => {
    fetchVisitorIp();
  }, []);
  return (
    <div className="home-page">
      {userSignedIn && <h1>Welcome {user.firstName}</h1>}
      <h1>Home</h1>
      <div></div>
    </div>
  );
};

export default Home;
