import React from "react";
import axios from "axios";
import Api from "../../env";
import "./home.scss";
import Header from "../../components/header/Header";
import { useEffect } from "react";

const Home = () => {
  function fetchVisitorIp() {
    let ip = "";
    axios.get("https://api.ipify.org/?format=json").then((result) => {
      ip = result.data.ip;
      fetchVisitorData(ip);
    });
  }

  function fetchVisitorData(ip) {
    axios.post(`${Api}:${443}/api/add-ip`, { ip: ip }).then((result) => {
      axios
        .get(`${Api}:${443}/api/add-visitor-data`)
        .then((result) => console.log(result.data));
    });
  }

  useEffect(() => {
    fetchVisitorIp();
  }, []);
  return (
    <>
      <Header />
      <div>Home</div>
    </>
  );
};

export default Home;
