import React, { useState, useEffect } from "react";
import "./container.scss";

// Font Awesome
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import * as FA from "@fortawesome/free-solid-svg-icons";
// ------------------------------------------------------------
const Container = (props) => {
  // States
  const [activeContainer, setActiveContainer] = useState(false);
  // ---------------------------------------------------------
  // Use Effects
  useEffect(() => {
    props.setCurrentItem(0);
    // change active container based on current index
    setActiveContainer(props.currentContainer === props.index);
    //  change items count that is inside this container
    props.setCurrentItemsCount(props.container.containerItems.length);
  }, [props.currentContainer]);
  // ---------------------------------------------------------
  // functions
  const changeCurrentContainer = () => {
    props.setCurrentContainer(props.index);
  };
  // ---------------------------------------------------------
  return (
    <div
      onClick={changeCurrentContainer}
      className={`container ${activeContainer ? "active" : ""}`}
    >
      <h4 className="container-name">
        <FaIcon icon={FA.faBoxArchive} />
        {props.container.containerName}
      </h4>
      <p>
        <FaIcon icon={FA.faHammer} />
        Items: {props.container.containerItems.length}
      </p>
    </div>
  );
};

export default Container;
