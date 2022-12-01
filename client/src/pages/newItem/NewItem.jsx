import React from "react";
import "./newItem.scss";
import { useSelector, useDispatch } from "react-redux";
import { addNewItem } from "../../store/slices/newItemSlice";
import Header from "../../components/header/Header";
const NewItem = () => {
  const newItem = useSelector((state) => state.newItem.value);
  const dispatch = useDispatch();
  const addItem = function () {
    dispatch(addNewItem());
  };
  return (
    <>
      <Header />
      <div>
        <h1>New Item</h1>
        <p>{newItem}</p>
        <button onClick={addItem}>Add</button>
      </div>
    </>
  );
};

export default NewItem;
