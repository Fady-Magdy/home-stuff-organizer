import React, { useState } from "react";
import { useEffect } from "react";
import "./container.scss";
const Container = (props) => {
  const [activeContainer, setActiveContainer] = useState(false);
  const changeCurrentContainer = () => {
    props.setCurrentContainer(props.index);
  };
  useEffect(() => {
    if (props.currentContainer === props.index) {
      setActiveContainer(true);
    } else {
      setActiveContainer(false);
    }
  }, [props.currentContainer]);
  return (
    <div
      onClick={changeCurrentContainer}
      className={`container ${activeContainer ? "active" : ""}`}
    >
      <h4 className="container-name">Name: {props.container.containerName}</h4>
      <p>Number of items: {props.container.containerItems.length}</p>
    </div>
  );
};

export default Container;
