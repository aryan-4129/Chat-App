import React, { useState } from "react";

import css from "./signup.module.css";

import AnimatedComp from "../components/AnimatedComp";
import Loader from "../components/Loader";

import { IoChatbox } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

import authStore from "../store/authStore";
import { themeStore } from "../store/themeStore";

const LoginPage = () => {
  const { islogging, login } = authStore();
  const { theme } = themeStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("in form handle function");
    login(formData);
  };

  return (
    <>
      <div className={`${css.bodyContainer} text-center`}>
        {/* left div container */}
        <div style={{ height: "80%" }} className={`${css.leftDivContainer}`}>
          <div>
            <IoChatbox className={`${css.logo}`} />

            <div className="fw-bold p-2">Log into your Account</div>
            <div>Start Logging to chat</div>
          </div>

          {/*  form container */}
          <form className={`text-center my-3`} onSubmit={handleFormSubmit}>
            <div className="flex-col mb-3">
              <label htmlFor="email">Email</label>
              <div className="d-flex flex-row align-items-center ">
                <MdEmail style={{ marginRight: "8px" }} className="fs-4" />
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="xyz@gmail.com"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex-col mb-3">
              <label htmlFor="password">Password</label>
              <div className="d-flex flex-row justify-content-between  align-items-center ">
                <TbLockPassword
                  style={{ marginRight: "8px" }}
                  className="fs-4"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control "
                  placeholder="......."
                  id="password"
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  style={{ backgroundColor: `${theme}` }}
                  className={`border-0 ms-2`}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeSharp className="fs-4" />
                  ) : (
                    <FaEyeSlash className="fs-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className=" form-control btn btn-primary my-2"
              // disabled={formValidate()}
            >
              Login
            </button>
            {islogging ? <Loader /> : null}
          </form>
          <div>
            <span>Create a new account ?</span>
            <Link to="/signup" className="mx-2 ">
              Sign in
            </Link>
          </div>
        </div>
        <div style={{ marginRight: "150px" }} className="w-3/4">
          <AnimatedComp />
          <h3>Start connecting with other people.</h3>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
