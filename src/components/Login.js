import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./auth";

const Login = () => {
  const navigator = useNavigate();

  const [user, setUser] = useState("");
  const auth = useAuth();
  const [login1, setLogin] = useState({
    email: "",
    password: "",
  });

  let token = Cookies.get("loginToken");
  // //   console.log("token", token);
  auth.login(token);
  const handleLogin = (e) => {
    setLogin({ ...login1, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signin`,
        {
          ...login1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast(loginData.data.message);
      setUser(loginData.data.token);

      Cookies.set("loginToken", loginData.data.token);
      //   console.log(loginData);
      navigator("/");
      window.location.reload();
    } catch (error) {
      toast(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="loginbody">
        <form
          className="auth-form"
          style={{ textAlign: "center", width: "100%" }}
          onSubmit={handleLogin}
        >
          <h1>Login</h1>
          <div style={{ textAlign: "left" }}>
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={login1.email}
              onChange={handleLogin}
              required
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label>Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={login1.password}
              onChange={handleLogin}
              required
            />
          </div>

          <button onClick={login} className="ak-btn" type="submit">
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
