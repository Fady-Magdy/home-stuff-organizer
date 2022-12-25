import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./items.scss";

// Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
// Components
import Room from "../../components/room/Room";
import Container from "../../components/container/Container";
import Item from "../../components/item/Item";
import NewItemModal from "../../components/newItemModal/NewItemModal";
import Loading from "../../components/loading/Loading";
// -------------------------------------------------------------------
const Items = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  const userStatus = useSelector((state) => state.user.status);
  const accountActive = useSelector((state) => state.user.accountActive);
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
  // States for modal
  const [showModal, setShowModal] = useState(false);
  const [currentModalFor, setCurrentModalFor] = useState("");
  const [currentModalType, setCurrentModalType] = useState("");
  // used to blocking add buttons
  const [cantAddRoom, setCantAddRoom] = useState(true);
  const [cantAddContainer, setCantAddContainer] = useState(true);
  const [cantAddItem, setCantAddItem] = useState(true);
  // to get current object itself
  const [currentRoomObj, setCurrentRoomObj] = useState(null);
  const [currentContainerObj, setCurrentContainerObj] = useState(null);
  const [currentItemObj, setCurrentItemObj] = useState(null);
  // to get which (room,cont,item) should be edited
  const [currentIndexForModal, setCurrentIndexForModal] = useState(0);
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
    currentIndexForModal,
  };
  // ---------------------------------------------------------------
  // functions
  function showNewModal(forWhat, modalType, index) {
    setCurrentIndexForModal(index);
    setCurrentModalType(modalType);
    setCurrentModalFor(forWhat);
    setShowModal(true);
  }

  // ---------------------------------------------------------------
  // Use Effects
  useEffect(() => {
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
      setCantAddRoom(!userStatus === "success");
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
    userStatus,
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
        <div className="section-tools">
          <p>Total: {userStatus === "success" ? user.homeItems.length : "0"}</p>
          <button
            onClick={() => showNewModal("room", "new")}
            disabled={cantAddRoom}
          >
            <FaIcon icon={FA.faPlus} />
          </button>
        </div>
        <hr />
        <div className="rooms-list">
          {userStatus === "success" && totalRooms < 1 && (
            <p className="empty-section-message">Create your first room</p>
          )}
          {/* Rooms list */}
          {accountActive ? (
            userStatus === "success" ? (
              user.homeItems.map((room, index) => {
                return (
                  <Room
                    key={room._id}
                    room={room}
                    index={index}
                    {...allProps}
                  />
                );
              })
            ) : (
              <Loading />
            )
          ) : (
            <p className="empty-section-message">Log In to Begin</p>
          )}
        </div>
      </div>
      {/* Containers Column */}
      <div className="containers">
        <h1 className="section-title">
          <FaIcon icon={FA.faBoxArchive} />
          Containers
        </h1>
        <div className="section-tools">
          <p>Total: {userStatus === "success" ? totalContainers : "0"}</p>
          <button
            onClick={() => showNewModal("container", "new")}
            disabled={cantAddContainer}
          >
            <FaIcon icon={FA.faPlus} />
          </button>
        </div>
        <hr />
        <div className="containers-list">
          {userStatus === "success" && currentContainersCount < 1 && (
            <p className="empty-section-message">No Containers</p>
          )}
          {/* Containers list */}
          {accountActive ? (
            userStatus === "success" ? (
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
              })
            ) : (
              <Loading />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Items Column */}
      <div className="items">
        <h1 className="section-title">
          <FaIcon icon={FA.faHammer} />
          Items
        </h1>
        <div className="section-tools">
          <p>Total: {userStatus === "success" ? totalItems : "0"}</p>
          <button
            onClick={() => showNewModal("item", "new")}
            disabled={cantAddItem}
          >
            <FaIcon icon={FA.faPlus} />
          </button>
        </div>
        <hr />
        <div className="items-list">
          {userStatus === "success" && currentItemsCount < 1 && (
            <p className="empty-section-message">No Items</p>
          )}
          {/* Items list */}
          {accountActive ? (
            userStatus === "success" ? (
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
              })
            ) : (
              <Loading />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      {accountActive && (
        <div className="item-details">
          {userStatus === "success" && currentItemObj && (
            <>
              <h3 className="item-name">{currentItemObj.itemName}</h3>
              <p className="item-quantity">
                Quantity: {currentItemObj.itemQuantity || 1}
              </p>
              <button
                className="edit"
                onClick={() => showNewModal("item", "edit", currentItem)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
      {/* Modal Component */}
      {showModal && <NewItemModal {...allProps} />}
    </div>
  );
};

export default Items;
