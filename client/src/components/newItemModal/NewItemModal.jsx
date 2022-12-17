import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./newItemModal.scss";

import axios from "axios";
import Api from "../../api-link";
import { fetchUserData } from "../../store/slices/userSlice";

const NewItemModal = (props) => {
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const nameRef = useRef(null);
  const quantityRef = useRef(null);

  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  let currentModalFor =
    props.currentModalFor[0].toUpperCase() + props.currentModalFor.slice(1);
  let currentModalType =
    props.currentModalType[0].toUpperCase() + props.currentModalType.slice(1);

  const [inItem, setInItem] = useState(() => {
    if (currentModalFor === "Container") return "Room";
    if (currentModalFor === "Item") return "Container";
  });
  const [inItemName, setInItemName] = useState(() => {
    if (!user.signedIn) return "";
    if (currentModalFor === "Container") return props.currentRoomObj.roomName;
    if (currentModalFor === "Item")
      return props.currentContainerObj.containerName;
  });
  // -------------------------------------------------------------------
  // Functions
  function close() {
    props.setShowModal(false);
  }
  function submit(e) {
    if (newName === "") return;
    let roomId = props.currentRoomObj ? props.currentRoomObj._id : "";
    let containerId = props.currentContainerObj
      ? props.currentContainerObj._id
      : "";
    let itemId = props.currentContainerObj
      ? props.currentItemObj
        ? props.currentItemObj._id
        : ""
      : "";
    let data = {
      newName,
      newQuantity,
      userId: user._id,
      roomId,
      containerId,
      itemId,
    };
    if (e.key === "Enter" || e.target.className === "submit") {
      axios
        .post(
          `${Api}/api/items/${props.currentModalType}-${props.currentModalFor}`,
          data
        )
        .then((result) => {
          if (props.currentModalType === "new") {
            if (props.currentModalFor === "room") {
              props.setCurrentRoom(user.homeItems.length);
            } else if (props.currentModalFor === "container") {
              props.setCurrentContainer(
                props.currentRoomObj.roomContainers.length
              );
            } else {
              props.setCurrentItem(
                props.currentContainerObj.containerItems.length
              );
            }
          }
          dispatch(fetchUserData());
          props.setShowModal(false);
        });
    }
  }
  // -------------------------------------------------------------------
  // Use Effects
  useEffect(() => {
    nameRef.current.focus();
    if (props.currentModalType === "edit") {
      let oldName = "";
      let oldQuantity = 0;
      if (props.currentModalFor === "room") {
        oldName = props.currentRoomObj.roomName;
      } else if (props.currentModalFor === "container") {
        oldName = props.currentContainerObj.containerName;
      } else if (props.currentModalFor === "item") {
        oldName = props.currentItemObj.itemName;
        oldQuantity = props.currentItemObj.itemQuantity;
        quantityRef.current.value = oldQuantity;
        setNewQuantity(oldQuantity);
      }
      nameRef.current.value = oldName;
      setNewName(oldName);
    }
  }, [
    props.currentContainer,
    props.currentItem,
    props.currentModalFor,
    props.currentModalType,
    props.currentRoom,
    user.homeItems,
  ]);
  // -------------------------------------------------------------------
  return (
    <>
      <div onClick={close} className="new-modal-background"></div>
      <div className="item-modal">
        <div className="top">
          <h2 className="title">
            {currentModalType} {currentModalFor}
          </h2>
          {currentModalType === "New" && currentModalFor !== "Room" && (
            <p className="will-be-added-in">
              In {inItem} ({inItemName})
            </p>
          )}
          <hr />
          <div className="input-group">
            <label htmlFor="name">{currentModalFor} name</label>
            <input
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={submit}
              id="name"
              type="text"
              autoComplete="off"
              placeholder={`Enter Name`}
              ref={nameRef}
            />
          </div>
          {currentModalFor === "Item" && (
            <div className="input-group">
              <label htmlFor="quantity">{currentModalFor} quantity</label>
              <input
                onChange={(e) => setNewQuantity(e.target.value)}
                id="name"
                type="number"
                placeholder={`Enter quantity`}
                value={newQuantity}
                ref={quantityRef}
              />
            </div>
          )}
        </div>
        <button onClick={submit} className="submit">
          {currentModalType === "New" ? "Add" : "Edit"} {currentModalFor}
        </button>
        <button onClick={close} className="close">
          X
        </button>
      </div>
    </>
  );
};

export default NewItemModal;
