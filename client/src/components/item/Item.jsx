import React, { useEffect } from "react";
import { useState } from "react";
import "./item.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";

const Item = (props) => {
  const [activeItem, setActiveItem] = useState(false);

  const changeCurrentItem = () => {
    props.setCurrentItem(props.index);
  };
  useEffect(() => {
    if (props.currentItem === props.index) {
      setActiveItem(true);
    } else {
      setActiveItem(false);
    }
  }, [props.currentItem]);
  return (
    <div
      onClick={changeCurrentItem}
      className={`item ${activeItem ? "active" : ""}`}
    >
      <h4 className="item-name">
        <FontAwesomeIcon icon={faHammer} />
        {props.item.itemName}
      </h4>
    </div>
  );
};

export default Item;
