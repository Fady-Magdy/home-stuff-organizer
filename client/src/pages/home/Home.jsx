import React, { useEffect } from "react";
import axios from "axios";
import Api from "../../api-link";
import "./home.scss";
import { useState } from "react";

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");
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

  function addNewItem() {
    setRoomName((prev) => prev.trim());
    setContainerName((prev) => prev.trim());
    setItemName((prev) => prev.trim());
    let itemData = {
      roomName,
      containerName,
      itemName,
    };
    axios
      .post(`${Api}/api/add-new-item`, itemData)
      .then((result) => console.log(result.data));
  }
  function searchItem() {
    setSearchValue((prev) => prev.trim());
    axios
      .post(`${Api}/api/search-item`, { searchFor: searchValue })
      .then((result) => {
        console.log(result.data);
      });
  }
  function testServer() {
    axios.get(`${Api}/api`).then((result) => console.log(result.data));
  }
  useEffect(() => {
    fetchVisitorIp();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <hr />
      <h1>Add new Item</h1>
      <input
        onChange={(e) => {
          setRoomName(e.target.value);
        }}
        type="text"
        placeholder="Room Name"
      />
      <input
        onChange={(e) => {
          setContainerName(e.target.value);
        }}
        type="text"
        placeholder="Container Name"
      />
      <input
        onChange={(e) => {
          setItemName(e.target.value);
        }}
        type="text"
        placeholder="Item Name"
      />
      <button onClick={addNewItem}>Add New Item</button>
      <hr />
      <h1>Find your Item</h1>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        placeholder="Search Item"
      />
      <button onClick={searchItem}>Search Item</button>

      <div></div>
      <button onClick={testServer}>Test Server</button>
    </div>
  );
};

export default Home;
