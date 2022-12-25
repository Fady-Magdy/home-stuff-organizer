import React, { useEffect, useState } from "react";
import "./item.scss";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
// Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
// API
import axios from "axios";
import Api from "../../api-link";
// -------------------------------------------------------------------------
const Item = (props) => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
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
      setLoadingMessage("Deleting...");
      setDeleting(true);
    }
    setConfirmDelete(true);
    setTimeout(() => {
      setConfirmDelete(false);
    }, 1500);
  }
  // -------------------------------------------------------
  // JSX
  if (deleting) {
    return <div className="item active loading">{loadingMessage}</div>;
  }
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
      <span>Quantity: {props.item.itemQuantity || 1}</span>
      <div className="bottom">
        <div className="buttons">
          <button
            onClick={deleteItem}
            className={`delete-btn ${confirmDelete ? "confirm" : ""}`}
          >
            <FaIcon icon={FA.faTrash} />
          </button>
          <button
            onClick={() => {
              changeCurrentItem();
              props.showNewModal("item", "edit");
            }}
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
