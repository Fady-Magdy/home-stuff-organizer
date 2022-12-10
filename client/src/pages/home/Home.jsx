import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../api-link";
import "./home.scss";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.userData);
  const userSignedIn = useSelector((state) => state.user.signedIn);
  const [searchValue, setSearchValue] = useState("");

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

  function searchItem() {
    setSearchValue((prev) => prev.trim());
    axios
      .post(`${Api}/api/search-item`, { searchFor: searchValue })
      .then((result) => {
        console.log(result.data);
      });
  }
  useEffect(() => {
    fetchVisitorIp();
  }, []);
  return (
    <div className="home-page">
      {userSignedIn && <h1>Welcome {user.firstName}</h1>}
      <h1>Home</h1>
      <hr />
      <h1>Find your Item</h1>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        placeholder="Search Item"
      />
      <button onClick={searchItem}>Search Item</button>
      <div></div>
    </div>
  );
};

export default Home;
