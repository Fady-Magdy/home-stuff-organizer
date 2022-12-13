import React, { useState, useEffect } from "react";
import "./container.scss";
import { useDispatch, useSelector } from "react-redux";
// Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../store/slices/userSlice";
import axios from "axios";
import Api from "../../api-link";
// ------------------------------------------------------------
const Container = (props) => {
  // States
  const user = useSelector((state) => state.user.userData);
  const [activeContainer, setActiveContainer] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  // ---------------------------------------------------------
  // Use Effects
  useEffect(() => {
    props.setCurrentItem(0);
    // change active container based on current index
    setActiveContainer(props.currentContainer === props.index);
    //  change items count that is inside this container
    props.setCurrentItemsCount(props.container.containerItems.length);
  }, [props.currentContainer]);
  // ---------------------------------------------------------
  // functions
  const changeCurrentContainer = () => {
    props.setCurrentContainer(props.index);
  };
  function deleteContainer() {
    if (confirmDelete) {
      let roomId = user.homeItems[props.currentRoom]._id;
      let containerId = props.container._id;
      axios
        .delete(`${Api}/api/items/delete-container`, {
          data: { roomId, userId: user._id, containerId },
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
  // ---------------------------------------------------------

  return (
    <div
      onClick={changeCurrentContainer}
      className={`container ${activeContainer ? "active" : ""}`}
    >
      <h4 className="container-name">
        <FaIcon icon={FA.faBoxArchive} />
        {props.container.containerName}
      </h4>
      <span>
        <FaIcon icon={FA.faHammer} />
        Items: {props.container.containerItems.length}
      </span>
      <div className="bottom">
        <div className="buttons">
          <button
            onClick={deleteContainer}
            className={`delete-btn ${confirmDelete ? "confirm" : ""}`}
          >
            <FaIcon icon={FA.faTrash} />
          </button>
          <button
            onClick={() => props.showNewModal("container", "edit")}
            className="edit-btn"
          >
            <FaIcon icon={FA.faEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Container;
