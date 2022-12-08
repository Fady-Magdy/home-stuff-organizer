import React from "react";
import "./newItem.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemsData } from "../../store/slices/newItemSlice";

const NewItem = () => {
  const newItem = useSelector((state) => state.newItem.itemsData);
  const dispatch = useDispatch();
  const addItem = function () {
    dispatch(fetchItemsData());
  };
  return (
    <div>
      <h1>New Item</h1>
      <p>Item name: {newItem.name}</p>
      <p>Item location: {newItem.location}</p>
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default NewItem;
