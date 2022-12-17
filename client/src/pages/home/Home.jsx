import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./home.scss";
import firstSectionImage from "./images/first-section-image.jpg";
import Footer from "../../components/footer/Footer";
// API
import axios from "axios";
import Api from "../../api-link";
// ------------------------------------------------------------
const Home = () => {
  // States
  const user = useSelector((state) => state.user.userData);
  const accountActive = useSelector((state) => state.user.accountActive);
  // ------------------------------------------------------------
  // Functions
  function fetchVisitorIp() {
    let ip = "";
    axios.get("https://api.ipify.org/?format=json").then((result) => {
      ip = result.data.ip;
      fetchVisitorData(ip);
    });
  }
  function fetchVisitorData(ip) {
    axios.post(`${Api}/api/add-ip`, { ip: ip }).then((result) => {
      axios.post(`${Api}/api/add-visitor-data`);
    });
  }
  // ------------------------------------------------------------
  // Use Effects
  useEffect(() => {
    fetchVisitorIp();
  }, []);
  // ------------------------------------------------------------
  // JSX
  return (
    <div className="home-page">
      <section className="top">
        <div className="left">
          <h1>Organize your stuff easly</h1>
          <h2>And find your stuff in 1 second</h2>
          <div className="buttons">
            {!accountActive && (
              <Link className="button" to="/register">
                Get Started
              </Link>
            )}
            <Link className="button" to="/items">
              Begin Organizing
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={firstSectionImage} alt="" />
        </div>
      </section>
      {user.signedIn && <h1>Welcome {user.firstName}</h1>}
      <h1>Home</h1>
      <h3 className="not-complete">This project is not complete</h3>
      <Footer />
    </div>
  );
};

export default Home;
