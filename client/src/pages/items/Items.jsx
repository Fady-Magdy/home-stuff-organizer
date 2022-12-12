import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
import "./items.scss";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorClosed,
  faBoxArchive,
  faHammer,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Room from "../../components/room/Room";
import Container from "../../components/container/Container";
import Item from "../../components/item/Item";
import NewItemModal from "../../components/newItemModal/NewItemModal";

const Items = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentContainer, setCurrentContainer] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const [currentRoomsCount, setCurrentRoomsCount] = useState(0);
  const [currentContainersCount, setCurrentContainersCount] = useState(0);
  const [currentItemsCount, setCurrentItemsCount] = useState(0);

  const [totalContainers, setTotalContainers] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [currentModalFor, setCurrentModalFor] = useState("");

  const [cantAddContainer, setCantAddContainer] = useState(true);
  const [cantAddItem, setCantAddItem] = useState(true);

  useEffect(() => {
    if (!user.homeItems) return;
    // get total containers count
    setTotalContainers(0);
    user.homeItems.forEach((room) => {
      setTotalContainers((prev) => prev + room.roomContainers.length);
    });
    // get total items count
    setTotalItems(0);
    user.homeItems.forEach((room) => {
      room.roomContainers.forEach((container) => {
        setTotalItems((prev) => prev + container.containerItems.length);
      });
    });
  }, [user]);
  useEffect(() => {
    dispatch(fetchUserData());
  }, [showModal]);
  function showNewModal(forWhat) {
    setCurrentModalFor(forWhat);
    setShowModal(true);
  }
  useEffect(() => {
    setCantAddItem(currentContainersCount === 0);
    if (user.homeItems) {
      setCurrentRoomsCount(user.homeItems.length);
      setCantAddContainer(user.homeItems.length < 1);
      if (
        user.homeItems[currentRoom] &&
        user.homeItems[currentRoom].roomContainers[currentContainer]
      ) {
        setCurrentItemsCount(
          user.homeItems[currentRoom].roomContainers[currentContainer]
            .containerItems.length
        );
      }
      if (user.homeItems.length < 1) {
        setCurrentContainersCount(0);
      }
      if (currentContainersCount === 0) {
        setCurrentItemsCount(0);
      }
      if (user.homeItems && user.homeItems[currentRoom]) {
        setCurrentContainersCount(
          user.homeItems[currentRoom].roomContainers.length
        );
      }
    }
  }, [
    cantAddContainer,
    currentContainer,
    currentContainersCount,
    currentRoom,
    user.homeItems,
  ]);
  return (
    <div className="items-page">
      <div className="rooms">
        <h1 className="section-title">
          <FontAwesomeIcon icon={faDoorClosed} />
          Rooms
        </h1>
        {user.homeItems && (
          <div className="section-tools">
            <p>Total: {user.homeItems.length}</p>
            <button onClick={() => showNewModal("room")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
        <hr />
        <div className="rooms-list">
          {currentRoomsCount < 1 && (
            <p className="empty-section-message">You have no rooms</p>
          )}
          {user.homeItems &&
            user.homeItems.map((room, index) => {
              return (
                <Room
                  key={room._id}
                  index={index}
                  currentRoom={currentRoom}
                  setCurrentRoom={setCurrentRoom}
                  setCurrentContainer={setCurrentContainer}
                  currentItem={currentItem}
                  setCantAddItem={setCantAddItem}
                  room={room}
                />
              );
            })}
        </div>
      </div>

      <div className="containers">
        <h1 className="section-title">
          <FontAwesomeIcon icon={faBoxArchive} />
          Containers
        </h1>
        {user.homeItems && (
          <div className="section-tools">
            <p>Total: {totalContainers}</p>
            <button
              onClick={() => showNewModal("container")}
              disabled={cantAddContainer}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
        <hr />
        <div className="containers-list">
          {currentContainersCount < 1 && (
            <p className="empty-section-message">No Containers</p>
          )}
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
                      setCurrentItem={setCurrentItem}
                      setCurrentItemsCount={setCurrentItemsCount}
                    />
                  );
                });
              }
            })}
        </div>
      </div>
      <div className="items">
        <h1 className="section-title">
          <FontAwesomeIcon icon={faHammer} />
          Items
        </h1>
        {user.homeItems && (
          <div className="section-tools">
            <p>Total: {totalItems}</p>
            <button onClick={() => showNewModal("item")} disabled={cantAddItem}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
        <hr />
        <div className="items-list">
          {currentItemsCount < 1 && (
            <p className="empty-section-message">No Items</p>
          )}
          {user.homeItems &&
            user.homeItems.map((room, index) => {
              if (index === currentRoom) {
                return room.roomContainers.map((container, index) => {
                  if (index === currentContainer) {
                    return container.containerItems.map((item, index) => {
                      return (
                        <Item
                          key={item._id}
                          item={item}
                          index={index}
                          currentItem={currentItem}
                          setCurrentItem={setCurrentItem}
                        />
                      );
                    });
                  }
                });
              }
            })}
        </div>
      </div>
      {showModal && (
        <NewItemModal
          currentModalFor={currentModalFor}
          setShowModal={setShowModal}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          currentContainer={currentContainer}
          setCurrentContainer={setCurrentContainer}
          setCurrentItem={setCurrentItem}
        />
      )}
    </div>
  );
};

export default Items;
