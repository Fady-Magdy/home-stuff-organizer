import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./newItem.scss";
import axios from "axios";
import Api from "../../api-link";
import { fetchUserData } from "../../store/slices/userSlice";
const NewItem = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState("");
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");

  function addNewItem() {
    setRoomName((prev) => prev.trim());
    setContainerName((prev) => prev.trim());
    setItemName((prev) => prev.trim());

    let itemData = {
      userId: user._id,
      roomName,
      containerName,
      itemName,
    };

    axios.post(`${Api}/api/items/new`, itemData).then((result) => {
      console.log(result.data);
      dispatch(fetchUserData());
    });
  }
  return (
    <div className="new-item-page">
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
    </div>
  );
};

export default NewItem;
