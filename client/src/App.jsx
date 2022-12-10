import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserData, login } from "./store/slices/userSlice";
import "./styles/app.scss";

// Pages
import Home from "./pages/home/Home";
import Items from "./pages/items/Items";
import NewItem from "./pages/newItem/NewItem.jsx";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound404 from "./pages/notFound404/NotFound404";

// components
import Header from "./components/header/Header";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("hso-userId")) {
      dispatch(login());
    }
    dispatch(fetchUserData());
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="items">
            <Route index path="/items" element={<Items />} />
            <Route path="new" element={<NewItem />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
