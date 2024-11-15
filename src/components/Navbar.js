import Cookies from "js-cookie";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata } from "./context/ContestProvider";
import { FaBirthdayCake, FaStore } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
function Navbar() {
  const navigator = useNavigate();
  const token = Cookies.get("loginToken");

  const [oneYearCompleteData, birthdata, lastStockData] = useContext(adddata);

  const logout = () => {
    Cookies.remove("loginToken");
    navigator("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg   navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            ROSHNI OPTICALS
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link " to="/monthlyIncome">
                  Monthly Income
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link " to="/stock">
                  Brand StockIn StockOut
                </NavLink>
              </li>
            </ul>
            <div className="d-flex gap-3 ">
              <NavLink className="nav-link p-0 " to="/lastStock">
                <span className="d-flex align-items-center justify-content-center" style={{ border: "1px solid white", padding: "6px ", width: "36px", height: "35px", position: "relative", borderRadius: "100%" }}>
                  <FaStore style={{ color: "white" }} />
                  <span style={{ position: "absolute", top: "-15px", right: "-3px" }} className="text-white">{lastStockData?.length}</span>
                </span>
              </NavLink>
              <NavLink className="nav-link p-0 " to="/birthday">
                <span className="d-flex align-items-center justify-content-center" style={{ border: "1px solid white", padding: "6px ", width: "36px", height: "35px", position: "relative", borderRadius: "100%" }}>
                  <FaBirthdayCake style={{ color: "white" }} />
                  <span style={{ position: "absolute", top: "-15px", right: "-3px" }} className="text-white">{birthdata?.length}</span>

                </span>
              </NavLink>
              <NavLink className="nav-link p-0" to="/yearComplete">
                <span className="d-flex align-items-center justify-content-center" style={{ border: "1px solid white", padding: "6px ", width: "36px", height: "35px", position: "relative", borderRadius: "100%" }}>
                  <MdCelebration style={{ color: "white" }} />
                  <span style={{ position: "absolute", top: "-15px", right: "-3px" }} className="text-white">{oneYearCompleteData?.length}</span>

                </span>
              </NavLink>
            </div>
            {token ? (
              <button className="btn btn-primary" onClick={logout}>
                logout
              </button>
            ) : (
              ""
            )}

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
