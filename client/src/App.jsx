import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NewItem from "./pages/newItem/NewItem.jsx";
import "./styles/app.scss";
function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-item" element={<NewItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
