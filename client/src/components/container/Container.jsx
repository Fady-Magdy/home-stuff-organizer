import React, { useState, useEffect } from "react";
import "./container.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faHammer } from "@fortawesome/free-solid-svg-icons";

const Container = (props) => {
  const [activeContainer, setActiveContainer] = useState(false);
  const changeCurrentContainer = () => {
    props.setCurrentContainer(props.index);
  };
  useEffect(() => {
    props.setCurrentItem(0);
    if (props.currentContainer === props.index) {
      setActiveContainer(true);
      props.setCurrentItemsCount(props.container.containerItems.length);
    } else {
      setActiveContainer(false);
    }
  }, [props.currentContainer]);
  return (
    <div
      onClick={changeCurrentContainer}
      className={`container ${activeContainer ? "active" : ""}`}
    >
      <h4 className="container-name">
        <FontAwesomeIcon icon={faBoxArchive} />
        {props.container.containerName}
      </h4>
      <p>
        <FontAwesomeIcon icon={faHammer} />
        Items: {props.container.containerItems.length}
      </p>
    </div>
  );
};

export default Container;
