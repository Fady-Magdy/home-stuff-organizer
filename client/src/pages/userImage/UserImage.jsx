import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./userImage.scss";
// API
import axios from "axios";
import Api from "../../api-link";
import { fetchUserData } from "../../store/slices/userSlice";
// ------------------------------------------------------------
const UserImage = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  const userImages = useSelector((state) => state.user.images);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState("");
  // ----------------------------------------------------------
  // Functions
  const changeImage = (e) => {
    setUserImage(e.target.getAttribute("data-value"));
    document.querySelectorAll(".image").forEach((image) => {
      image.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
  };
  const submit = () => {
    if (userImage === "") return;
    let data = {
      userId: user._id,
      userImage: userImage,
    };
    axios.post(`${Api}/api/users/update-image`, data).then((result) => {
      dispatch(fetchUserData());
      navigate("/");
    });
  };
  const updateImageLater = () => {
    navigate("/");
  };
  // ----------------------------------------------------------
  //  JSX
  return (
    <div className="user-image-page">
      <div className="images-container">
        <div className="images">
          {userImages.map((image, index) => {
            return (
              <div onClick={changeImage} key={index} className="image">
                <img
                  data-value={image}
                  src={require(`../../images/${image}.png`)}
                  alt=""
                />
                ;
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button onClick={submit} className="submit">
            Confirm
          </button>
          <button onClick={updateImageLater} className="cancel">
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserImage;
