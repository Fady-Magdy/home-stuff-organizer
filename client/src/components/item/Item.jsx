import React, { useEffect } from "react";
import { useState } from "react";
import "./item.scss";

import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Api from "../../api-link";
import { fetchUserData } from "../../store/slices/userSlice";

const Item = (props) => {
  const user = useSelector((state) => state.user.userData);
  const [activeItem, setActiveItem] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  // -------------------------------------------------------
  // Use Effects
  useEffect(() => {
    // change current active item
    setActiveItem(props.currentItem === props.index);
  }, [props.currentItem]);
  // -------------------------------------------------------
  // Functions
  const changeCurrentItem = () => {
    props.setCurrentItem(props.index);
  };
  function deleteItem() {
    if (confirmDelete) {
      let roomId = user.homeItems[props.currentRoom]._id;
      let containerId =
        user.homeItems[props.currentRoom].roomContainers[props.currentContainer]
          ._id;
      let itemId = props.item._id;
      axios
        .delete(`${Api}/api/items/delete-item`, {
          data: { roomId, containerId, itemId, userId: user._id },
        })
        .then((result) => {
          dispatch(fetchUserData());
        });
    }
    setConfirmDelete(true);
    setTimeout(() => {
      setConfirmDelete(false);
    }, 1500);
  }
  // -------------------------------------------------------
  return (
    <div
      onClick={changeCurrentItem}
      className={`item ${activeItem ? "active" : ""}`}
    >
      <h4 className="item-name">
        <FaIcon icon={FA.faHammer} />
        {props.item.itemName}
      </h4>
      <FaIcon icon={FA.faCircleCheck} />
      <span>Quantity: {props.item.itemQuantity}</span>
      <div className="bottom">
        <div className="buttons">
          <button
            onClick={deleteItem}
            className={`delete-btn ${confirmDelete ? "confirm" : ""}`}
          >
            <FaIcon icon={FA.faTrash} />
          </button>
          <button
            onClick={() => props.showNewModal("item", "edit")}
            className="edit-btn"
          >
            <FaIcon icon={FA.faEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
