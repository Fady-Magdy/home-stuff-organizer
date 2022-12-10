import React, { useState } from "react";
import "./items.scss";
import { useSelector } from "react-redux";
import Room from "../../components/room/Room";
import Container from "../../components/container/Container";
const Items = () => {
  const user = useSelector((state) => state.user.userData);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentContainer, setCurrentContainer] = useState(0);
  console.log(currentRoom);
  return (
    <div className="items-page">
      <div>
        <div className="rooms">
          <h1>Rooms</h1>
          {user.homeItems &&
            user.homeItems.map((room, index) => {
              return (
                <Room
                  key={room._id}
                  index={index}
                  currentRoom={currentRoom}
                  setCurrentRoom={setCurrentRoom}
                  setCurrentContainer={setCurrentContainer}
                  room={room}
                />
              );
            })}
        </div>
      </div>
      <div className="containers">
        <h1>Containers</h1>
        {user.homeItems &&
          user.homeItems.map((room, index) => {
            if (index === currentRoom) {
              return room.roomContainers.map((container, index) => {
                return (
                  <Container
                    key={container._id}
                    index={index}
                    currentContainer={currentContainer}
                    setCurrentContainer={setCurrentContainer}
                    container={container}
                  />
                );
              });
            }
          })}
      </div>
      <div className="items">
        {user.homeItems &&
          user.homeItems.map((room, index) => {
            if (index === currentRoom) {
              return room.roomContainers.map((container, index) => {
                if (index === currentContainer) {
                  return container.containerItems.map((item) => {
                    return <div key={item._id}>{item.itemName}</div>;
                  });
                }
              });
            }
          })}
      </div>
    </div>
  );
};

export default Items;
