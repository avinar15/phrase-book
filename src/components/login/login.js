import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../environment";
import { Auth } from "../../services/auth";
import "./login.css";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const nav = useNavigate();

  // function constructor() {
  //   handleEmailChange = handleEmailChange.bind();
  //   handlePasswordChange = handlePasswordChange.bind();
  //   doLogin = doLogin.bind();
  // }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailError("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setPasswordError("");
  }

  function doLogin() {
    const path = `${serverURL}/api/login`;
    axios
      .post(path, {
        email: email,
        password: password,
      })
      .then(async (res) => {
        const data = res.data;
        if (data.user) {
          Auth.user = data.user;
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          nav("/words");
        }
      })
      .catch((err) => {
        if (err.response.data && err.response.data.message) {
          toastr.error(err.response.data.message);
        }

        if (err.response.data && err.response.data.errors) {
          const errors = err.response.data.errors;
          if (errors.email) {
            setEmail(errors.email[0]);
          }
          if (errors.password) {
            setPasswordError(errors.password[0]);
          }
        }
      });
  }

  return (
    <div className="bg-cover">
      <div className="mt-4 d-flex justify-content-center align-self-center">
        <div className="col-12 col-md-7 col-lg-4 bg-light ">
          <span className="heading text-center d-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              className="bi bi-person-workspace "
              viewBox="0 0 16 16"
            >
              <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
            </svg>
          </span>
          <div className="text-center">
            <p className="display-6 text-buld">Log In</p>
            <p className="fst-italic fw-lighter-4 border-bottom">Welcome</p>
          </div>

          <div className="m-4 felx-column">
            <form>
              <div className="form-group">
                <label htmlFor="email" className="form-label my-2">
                  UserName:
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="e.g avinar@exmpel.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <small className="text-danger d-block">{emailError}</small>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label my-2">
                  Password
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-key"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <small className="text-danger d-block">{passwordError}</small>
              </div>
              <div className="text-center mt-2 mb-4">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={doLogin}
                >
                  {" "}
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
