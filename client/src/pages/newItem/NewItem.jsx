import React from "react";
import "./newItem.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemsData } from "../../store/slices/newItemSlice";
import Header from "../../components/header/Header";
import Api from "../../env";
const NewItem = () => {
  const newItem = useSelector((state) => state.newItem.itemsData);
  const dispatch = useDispatch();
  const addItem = function () {
    dispatch(fetchItemsData());
  };
  console.log(Api);
  return (
    <>
      <Header />
      <div>
        <h1>New Item</h1>
        <p>Item name: {newItem.name}</p>
        <p>Item location: {newItem.location}</p>
        <button onClick={addItem}>Add</button>
      </div>
    </>
  );
};

export default NewItem;
