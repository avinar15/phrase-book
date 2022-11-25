import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { serverURL } from "../../environment";
import img from "../../images/img1.jpg";
import { redirect } from "react-router-dom";
import { Auth } from "../../services/auth";

function Landing() {
  const [login, setLogin] = useState('login');
  useEffect(() => {
    checkLogin();
  });

  function checkLogin() {
    const token = localStorage.getItem("token");
    if (token === "") {
      return Promise.reject(0);
    }

    const url = `${serverURL}/api/whoami`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // set user data in localstorage
        const user = response.data;
        setLogin(user?.name)
        localStorage.setItem("user", JSON.stringify(user));
        if (window.location.pathname === '/login') {
          window.location.href = "/dashboard"
        }
        
      })
      .catch(function (error) {
        if (window.location.pathname !== '/login') {
          window.location.href = "/login"
        }
      });
  }

  return (
    <div>
      {/* navbar */}

      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-xxl">
          <button className="navbar-brand btn btn-link" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <Link className="text-success fw-bold px-2 text-decoration-none" to={`/`}>Phrase Book</Link>
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end align-center "
            id="navbarNav"
          >
            <ul className="navbar-nav">
              { login &&
                  <li className="nav-item">
                    <Link className="nav-link btn btn-link px-2" to={`/words`}>
                      Words
                    </Link>
                  </li>
              }
             
              <li className="nav-item">
                <Link className="nav-link btn btn-link px-2" to={`/`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-link px-2" to={`/about`}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-link px-2" to={`/login`}>                  
                  {login}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
}

export default Landing;
