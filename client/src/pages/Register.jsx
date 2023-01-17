import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authAction";
import "./styles/register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };


  const [userRegister, setUserRegister] = useState(initialState);
  const [typePass, setTypePass] = useState(false);

  const { userName, email, password } = userRegister;

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  };

  const handleTypePass = () => setTypePass(!typePass);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userRegister))
  };

  return (
    <div className="register">
      <div className="register__registerBorder">
        <span className="register__registerBorder--registerTitle">
          Register
        </span>
        <div className="register__registerBorder--registerBorderDown">
          <form className="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="userName" className="registerForm__registerText">
              Username
            </label>
            <input
              className="registerForm__registerInput"
              type="text"
              placeholder="Enter your userName..."
              id="userName"
              name="userName"
              onChange={handleChangeInput}
              value={userName}
            />
            <label className="registerForm__registerText" htmlFor="Email">
              Email
            </label>
            <input
              className="registerForm__registerInput"
              type="text"
              id="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChangeInput}
              value={email}
            />
            <label htmlFor="password" className="registerForm__registerText">
              Password
            </label>
            <div>
              <input
                className="registerForm__registerInput"
                type={!typePass ? "password" : "text"}
                id="password"
                placeholder="Enter your password"
                name="password"
                onChange={handleChangeInput}
                value={password}
              />
              <small
                onClick={handleTypePass}
                className="registerForm__eyesonPassword"
              >
                {!typePass ? "Show" : "Hide"}
              </small>
            </div>
            <button className="registerForm__registerButton" type="submit">
              Register
            </button>
            <p className="registerForm__loginTextAccount">
              Do you have already an account?
              <Link
                className="registerForm__loginTextAccount--registerLoginButton"
                to="/login"
              >
                Login{" "}
              </Link>
            </p>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
