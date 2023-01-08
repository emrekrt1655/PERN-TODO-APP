import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction"
import "./styles/login.scss";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()





  const initialState = {
    email: "",
    password: "",
  };

 

  const [userLogin, setUserLogin] = useState(initialState);
  const { email, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleTypePass = () => setTypePass(!typePass);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userLogin)).then(() => navigate("/"))

  };

  return (
    <div className="login">
      <div className="login__loginBorder">
        <span className="login__loginBorder--loginTitle">Login</span>
        <div className="login__loginBorder--loginBorderDown">
          <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="email" className="loginForm__loginText">
              Email
            </label>
            <input
              className="loginForm__loginInput"
              type="text"
              placeholder="Enter your email address."
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <label htmlFor="password" className="loginForm__loginText">
              Password
            </label>
            <div>
              <input
                className="loginForm__loginInput"
                type={typePass ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChangeInput}
                value={password}
              />
              <small
                onClick={handleTypePass}
                className="loginForm__eyesonPassword"
              >
                {typePass ? "Hide" : "Show"}
              </small>
            </div>
            <button
              className="loginForm__loginButton"
              type="submit"
              disabled={email && password ? false : true}
            >
              Login
            </button>
            <p className="loginForm__registerTextAccount">
              Don't you have an account?
              <Link
                className="loginForm__registerTextAccount--loginRegisterButton"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
