import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, activateAccount } from "./store/slices/userSlice";
import "./styles/app.scss";

// Pages
import Items from "./pages/items/Items";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound404 from "./pages/notFound404/NotFound404";

// components
import Header from "./components/header/Header";
import UserImage from "./pages/userImage/UserImage";

function App() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("hso-userId")) {
      dispatch(fetchUserData());
      dispatch(activateAccount());
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header />
        <Routes>
          <Route index path="/" element={<Items />} />
          {user.signedIn && (
            <Route path="profile">
              <Route index path="/profile" element={<div>Profile</div>} />
              <Route
                path="/profile/update-image"
                element={<UserImage />}
                index
              />
            </Route>
          )}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
