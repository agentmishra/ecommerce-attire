import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logo } from "../../assets";
import "./navbar.css";
import { useAuth } from "../../context/authContext";
import { useFilters } from "../../context/filterContext";

export const NavBar = () => {
  const { authState, userLogout } = useAuth();
  const { filterState, filterDispatch } = useFilters();
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const activeStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary-color)" : "black",
    textDecoration: "none",
  });

  const handleLogoutClick = () => {
    userLogout();
    navigate("/");
  };

  console.log(authState);
  return (
    <>
      <div
        className="top-bar"
        style={{ display: isVisible ? "block" : "none" }}
      >
        Sign up and get exclusive offers.
        <i onClick={() => setIsVisible(false)} class="fa-solid fa-xmark"></i>
      </div>
      <div className="nav">
        <div className="navbar">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
          <div className="nav-options">
            <p>
              <NavLink style={activeStyle} to="/">
                HOME
              </NavLink>
            </p>
            <p>
              <NavLink style={activeStyle} to="/products">
                SHOP
              </NavLink>
            </p>
          </div>
          <div className="nav-navigate">
            <div>
              <i
                class="fa-solid fa-magnifying-glass"
                style={{ color: "#98999a" }}
              ></i>
              <input
                placeholder="Search"
                value={filterState.search}
                onChange={(e) => {
                  filterDispatch({
                    type: "filter_by_search",
                    payload: e.target.value,
                  });
                  filterState.search.length > 0 && navigate("/products");
                }}
              />
            </div>
            <i
              onClick={() => navigate("/cart")}
              class="fa-solid fa-cart-shopping"
            ></i>
            <i
              onClick={() => navigate("/wishlist")}
              class="fa-solid fa-heart"
            ></i>

            {authState.isLoggedIn ? (
              <button className="login-icon" onClick={handleLogoutClick}>
                <i class="fa-regular fa-user"></i> Log Out
              </button>
            ) : (
              <button className="login-icon" onClick={() => navigate("/login")}>
                <i class="fa-regular fa-user"></i> Log In
              </button>
            )}
          </div>
        </div>

        <div className="search-bar">
          <i
            class="fa-solid fa-magnifying-glass"
            style={{ color: "#98999a" }}
          ></i>
          <input placeholder="Search" />
        </div>
      </div>
    </>
  );
};
