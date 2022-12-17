import React, { useRef, useState, useEffect } from "react";
import "./room.scss";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
// API
import axios from "axios";
import Api from "../../api-link";
// Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
// -------------------------------------------------------------------------
const Room = (props) => {
  // States
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [activeRoom, setActiveRoom] = useState(false);
  const itemsCountRef = useRef(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  // ----------------------------------------------------------------------
  //  Use Effects
  useEffect(
    () => {
      if (props.currentRoom === props.index) {
        props.setCantAddItem(
          user.homeItems[props.currentRoom].roomContainers.length < 1
        );
      }
      setActiveRoom(props.currentRoom === props.index);
      if (props.currentRoomObj === null) {
        props.setCurrentRoomObj(user.homeItems[props.currentRoom]);
      }
      // get count of total items inside this room to show in room card
      itemsCountRef.current = 0;
      props.room.roomContainers.forEach((container) => {
        itemsCountRef.current += container.containerItems.length;
      });
    },
    [props.currentRoom, props.currentItem, props, user.homeItems],
    props.currentRoomObj
  );
  // ----------------------------------------------------------------------
  //  Functions
  function deleteRoom() {
    if (confirmDelete) {
      let roomId = props.room._id;
      axios
        .delete(`${Api}/api/items/delete-room`, {
          data: { roomId: roomId, userId: user._id },
        })
        .then((result) => {
          dispatch(fetchUserData());
        });
      props.setCurrentRoom((prev) => prev - 1);
      setLoadingMessage("Deleting...");
      setDeleting(true);
    }
    setConfirmDelete(true);
    setTimeout(() => {
      setConfirmDelete(false);
    }, 1500);
  }
  const changeCurrentRoom = () => {
    props.setCurrentRoom(props.index);
    props.setCurrentContainer(0);
  };
  // ----------------------------------------------------------------------
  // JSX
  if (deleting) {
    return <div className="room active loading">{loadingMessage}</div>;
  }
  return (
    <div
      onClick={changeCurrentRoom}
      className={`room ${activeRoom ? "active" : ""}`}
    >
      <h4 className="room-name">
        <FaIcon icon={FA.faDoorClosed} />
        {props.room.roomName}
      </h4>
      <p>
        <FaIcon icon={FA.faBoxArchive} />
        Containers: {props.room.roomContainers.length}
      </p>
      <div className="bottom">
        <span>
          <FaIcon icon={FA.faHammer} />
          Items: {itemsCountRef.current}
        </span>
        <div className="buttons">
          <button
            onClick={deleteRoom}
            className={`delete-btn ${confirmDelete ? "confirm" : ""}`}
          >
            <FaIcon icon={FA.faTrash} />
          </button>
          <button
            onClick={() => props.showNewModal("room", "edit")}
            className="edit-btn"
          >
            <FaIcon icon={FA.faEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
