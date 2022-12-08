import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NewItem from "./pages/newItem/NewItem.jsx";
import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import "./styles/app.scss";
import NotFound404 from "./pages/notFound404/NotFound404";
import Login from "./pages/login/Login";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "./store/slices/userSlice";
function App() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  console.log(user);

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-item" element={<NewItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
