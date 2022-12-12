import React, { useEffect } from "react";
import { useState } from "react";
import "./item.scss";

import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";

const Item = (props) => {
  const [activeItem, setActiveItem] = useState(false);
  // -------------------------------------------------------
  // Use Effects
  useEffect(() => {
    // change current active item
    setActiveItem(props.currentItem === props.index);
  }, [props.currentItem]);
  // -------------------------------------------------------
  // Functions
  const changeCurrentItem = () => {
    props.setCurrentItem(props.index);
  };
  // -------------------------------------------------------
  return (
    <div
      onClick={changeCurrentItem}
      className={`item ${activeItem ? "active" : ""}`}
    >
      <h4 className="item-name">
        <FaIcon icon={FA.faHammer} />
        {props.item.itemName}
      </h4>
    </div>
  );
};

export default Item;
