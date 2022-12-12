import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
import "./room.scss";

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

  const changeCurrentRoom = (e) => {
    props.setCurrentRoom(props.index);
    props.setCurrentContainer(0);
  };
  // ----------------------------------------------------------------------
  //  Use Effects
  useEffect(() => {
    if (props.currentRoom === props.index) {
      props.setCantAddItem(
        user.homeItems[props.currentRoom].roomContainers.length < 1
      );
    }
    setActiveRoom(props.currentRoom === props.index);

    // get count of total items inside this room to show in room card
    itemsCountRef.current = 0;
    props.room.roomContainers.forEach((container) => {
      itemsCountRef.current += container.containerItems.length;
    });
  }, [props.currentRoom, props.currentItem, props, user.homeItems]);
  // ----------------------------------------------------------------------
  //  Functions
  function deleteRoom() {
    let roomId = props.room._id;
    axios
      .delete(`${Api}/api/items/delete-room`, {
        data: { roomId: roomId, userId: user._id },
      })
      .then((result) => {
        dispatch(fetchUserData());
      });
  }
  // ----------------------------------------------------------------------
  // JSX
  return (
    <div
      id="parent"
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
          <button onClick={deleteRoom} className="delete-btn">
            <FaIcon icon={FA.faTrash} />
          </button>
          <button className="edit-btn">
            <FaIcon icon={FA.faEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
