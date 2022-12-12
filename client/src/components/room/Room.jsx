import React, { useRef, useState, useEffect } from "react";
import "./room.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorClosed,
  faBoxArchive,
  faHammer,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Api from "../../api-link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
const Room = (props) => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [activeRoom, setActiveRoom] = useState(false);
  const numberOfItemsRef = useRef(0);

  const changeCurrentRoom = (e) => {
    props.setCurrentRoom(props.index);
    props.setCurrentContainer(0);
  };
  useEffect(() => {
    if (props.currentRoom === props.index) {
      setActiveRoom(true);
      if (
        user.homeItems &&
        user.homeItems[props.currentRoom].roomContainers.length < 1
      ) {
        props.setCantAddItem(true);
      } else {
        props.setCantAddItem(false);
      }
    } else {
      setActiveRoom(false);
    }

    numberOfItemsRef.current = 0;
    props.room.roomContainers.forEach((container) => {
      numberOfItemsRef.current += container.containerItems.length;
    });
  }, [props.currentRoom, props.currentItem, props, user.homeItems]);

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

  return (
    <div
      id="parent"
      onClick={changeCurrentRoom}
      className={`room ${activeRoom ? "active" : ""}`}
    >
      <h4 className="room-name">
        <FontAwesomeIcon icon={faDoorClosed} />
        {props.room.roomName}
      </h4>
      <p>
        <FontAwesomeIcon icon={faBoxArchive} />
        Containers: {props.room.roomContainers.length}
      </p>
      <div className="bottom">
        <span>
          <FontAwesomeIcon icon={faHammer} />
          Items: {numberOfItemsRef.current}
        </span>
        <div className="buttons">
          <button onClick={deleteRoom} className="delete-btn">
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
