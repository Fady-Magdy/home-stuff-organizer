import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../api-link";
import { fetchUserData } from "../../store/slices/userSlice";
import "./newItemModal.scss";
const NewItemModal = (props) => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const nameRef = useRef(null);
  let currentModalFor =
    props.currentModalFor[0].toUpperCase() + props.currentModalFor.slice(1);
  function close() {
    props.setShowModal(false);
  }
  function add() {
    if (newName === "" ) return
    let data = {
      userId: user._id,
      newName,
      roomId:
        props.currentModalFor === "container" ||
        props.currentModalFor === "item"
          ? user.homeItems[props.currentRoom]._id
          : "",
      containerId:
        props.currentModalFor === "item"
          ? user.homeItems[props.currentRoom].roomContainers[
              props.currentContainer
            ]._id
          : "",
    };
    axios
      .post(`${Api}/api/items/add-${props.currentModalFor}`, data)
      .then((result) => {
        if (props.currentModalFor === "room") {
          props.setCurrentRoom(user.homeItems.length);
        } else if (props.currentModalFor === "container") {
          props.setCurrentContainer(
            user.homeItems[props.currentRoom].roomContainers.length
          );
        } else {
          props.setCurrentItem(
            user.homeItems[props.currentRoom].roomContainers[
              props.currentContainer
            ].containerItems.length
          );
        }
        dispatch(fetchUserData());
        props.setShowModal(false);
      });
  }
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  return (
    <>
      <div onClick={close} className="new-modal-background"></div>
      <div className="item-modal">
        <div className="top">
          <h2 className="title">New {currentModalFor}</h2>
          <hr />
          <div className="input-group">
            <label htmlFor="name">{currentModalFor} name</label>
            <input
              onChange={(e) => setNewName(e.target.value)}
              id="name"
              type="text"
              placeholder={`Enter Name`}
              ref={nameRef}
            />
          </div>
        </div>
        <button onClick={add} className="submit">
          Add {currentModalFor}
        </button>
        <button onClick={close} className="close">
          X
        </button>
      </div>
    </>
  );
};

export default NewItemModal;
