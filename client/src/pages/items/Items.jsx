import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
import "./items.scss";

// Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";

// Components
import Room from "../../components/room/Room";
import Container from "../../components/container/Container";
import Item from "../../components/item/Item";
import NewItemModal from "../../components/newItemModal/NewItemModal";
// -------------------------------------------------------------------
const Items = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  //  index of current(room, container, item)
  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentContainer, setCurrentContainer] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);

  // check how many items showing up
  const [currentContainersCount, setCurrentContainersCount] = useState(0);
  const [currentItemsCount, setCurrentItemsCount] = useState(0);

  // getting total items of all user data
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalContainers, setTotalContainers] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [currentModalFor, setCurrentModalFor] = useState("");
  const [currentModalType, setCurrentModalType] = useState("");

  // used to blocking add buttons
  const [cantAddContainer, setCantAddContainer] = useState(true);
  const [cantAddItem, setCantAddItem] = useState(true);

  const [currentRoomObj, setCurrentRoomObj] = useState(null);
  const [currentContainerObj, setCurrentContainerObj] = useState(null);
  const [currentItemObj, setCurrentItemObj] = useState(null);
  let allProps = {
    user,
    currentRoom,
    setCurrentRoom,
    currentContainer,
    setCurrentContainer,
    currentItem,
    setCurrentItem,
    currentContainersCount,
    setCurrentContainersCount,
    currentItemsCount,
    setCurrentItemsCount,
    totalContainers,
    setTotalContainers,
    totalItems,
    setTotalItems,
    showModal,
    setShowModal,
    currentModalFor,
    setCurrentModalFor,
    cantAddContainer,
    setCantAddContainer,
    cantAddItem,
    setCantAddItem,
    totalRooms,
    setTotalRooms,
    currentModalType,
    setCurrentModalType,
    showNewModal,
    currentRoomObj,
    setCurrentRoomObj,
    currentContainerObj,
    setCurrentContainerObj,
    currentItemObj,
    setCurrentItemObj,
    refreshData,
  };
  // ---------------------------------------------------------------
  // functions
  function showNewModal(forWhat, modalType) {
    setCurrentModalType(modalType);
    setCurrentModalFor(forWhat);
    setShowModal(true);
  }
  function refreshData() {
    if (user.signedIn) {
      setCurrentRoomObj(
        user.homeItems[currentRoom] ? user.homeItems[currentRoom] : null
      );
      setCurrentContainerObj(
        currentRoomObj
          ? currentRoomObj.roomContainers[currentContainer] || null
          : null
      );
      setCurrentItemObj(
        currentRoomObj && currentContainerObj
          ? currentContainerObj.containerItems[currentItem] || null
          : null
      );
      // get current items count
      if (currentContainerObj) {
        setCurrentItemsCount(currentContainerObj.containerItems.length);
      }
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
      // set add container button true or false
      setCantAddContainer(totalRooms < 1);
      // set add item button true or false
      setCantAddItem(currentContainersCount < 1);
      // get total rooms count
      setTotalRooms(user.homeItems.length);
      if (totalRooms < 1) {
        setCurrentContainersCount(0);
      }
      if (currentRoomObj) {
        setCurrentContainersCount(currentRoomObj.roomContainers.length);
      }
      if (currentContainersCount === 0) {
        setCurrentItemsCount(0);
      }
    }
  }
  // ---------------------------------------------------------------
  // Use Effects
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchUserData());
    }
  }, [dispatch, showModal]);

  useEffect(() => {
    refreshData();
  }, [
    currentContainersCount,
    currentRoom,
    currentContainer,
    currentItem,
    currentRoomObj,
    currentContainerObj,
    currentItemObj,
    totalRooms,
    totalContainers,
    totalItems,
    user.homeItems,
    user.signedIn,
  ]);
  // ---------------------------------------------------------------
  // JSX
  return (
    <div className="items-page">
      {/* Rooms Column */}
      <div className="rooms">
        <h1 className="section-title">
          <FaIcon icon={FA.faDoorClosed} />
          Rooms
        </h1>
        {user.signedIn && (
          <div className="section-tools">
            <p>Total: {user.homeItems.length}</p>
            <button onClick={() => showNewModal("room", "new")}>
              <FaIcon icon={FA.faPlus} />
            </button>
          </div>
        )}
        <hr />
        <div className="rooms-list">
          {totalRooms < 1 && (
            <p className="empty-section-message">You have no rooms</p>
          )}
          {/* Rooms list */}
          {user.signedIn &&
            user.homeItems.map((room, index) => {
              return (
                <Room key={room._id} room={room} index={index} {...allProps} />
              );
            })}
        </div>
      </div>
      {/* Containers Column */}
      <div className="containers">
        <h1 className="section-title">
          <FaIcon icon={FA.faBoxArchive} />
          Containers
        </h1>
        {user.signedIn && (
          <div className="section-tools">
            <p>Total: {totalContainers}</p>
            <button
              onClick={() => showNewModal("container", "new")}
              disabled={cantAddContainer}
            >
              <FaIcon icon={FA.faPlus} />
            </button>
          </div>
        )}
        <hr />
        <div className="containers-list">
          {currentContainersCount < 1 && (
            <p className="empty-section-message">No Containers</p>
          )}
          {/* Containers list */}
          {user.signedIn &&
            user.homeItems.map((room, index) => {
              if (index === currentRoom) {
                return room.roomContainers.map((container, index) => {
                  return (
                    <Container
                      key={container._id}
                      index={index}
                      container={container}
                      {...allProps}
                    />
                  );
                });
              }
            })}
        </div>
      </div>
      {/* Items Column */}
      <div className="items">
        <h1 className="section-title">
          <FaIcon icon={FA.faHammer} />
          Items
        </h1>
        {user.signedIn && (
          <div className="section-tools">
            <p>Total: {totalItems}</p>
            <button
              onClick={() => showNewModal("item", "new")}
              disabled={cantAddItem}
            >
              <FaIcon icon={FA.faPlus} />
            </button>
          </div>
        )}
        <hr />
        <div className="items-list">
          {currentItemsCount < 1 && (
            <p className="empty-section-message">No Items</p>
          )}
          {/* Items list */}
          {user.signedIn &&
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
                          {...allProps}
                        />
                      );
                    });
                  }
                });
              }
            })}
        </div>
      </div>
      {/* Modal Component */}
      {showModal && <NewItemModal {...allProps} />}
    </div>
  );
};

export default Items;
