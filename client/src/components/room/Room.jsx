import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./room.scss";
const Room = (props) => {
  const [activeRoom, setActiveRoom] = useState(false);
  const numberOfItemsRef = useRef(0);

  console.log(numberOfItemsRef.current);
  const changeCurrentRoom = () => {
    props.setCurrentRoom(props.index);
    console.log(props.currentRoom);
  };
  useEffect(() => {
    if (props.currentRoom === props.index) {
      setActiveRoom(true);
    } else {
      setActiveRoom(false);
    }
    props.setCurrentContainer(0);
    numberOfItemsRef.current = 0;
    props.room.roomContainers.forEach((container) => {
      numberOfItemsRef.current += container.containerItems.length;
    });
  }, [props.currentRoom]);
  return (
    <div
      onClick={changeCurrentRoom}
      className={`room ${activeRoom ? "active" : ""}`}
    >
      <h4 className="room-name">Name: {props.room.roomName}</h4>
      <p>Containers: {props.room.roomContainers.length}</p>
      <p>Total items: {numberOfItemsRef.current}</p>
    </div>
  );
};

export default Room;
