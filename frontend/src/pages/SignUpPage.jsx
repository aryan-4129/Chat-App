import React, { useState } from "react";
import toast from "react-hot-toast";

import css from "./signup.module.css";

import Loader from "../components/Loader";
import AnimatedComp from "../components/AnimatedComp";

import { IoChatbox } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

import authStore from "../store/authStore";
import { themeStore } from "../store/themeStore";

const SignUpPage = () => {
  const { isSigning, singUp } = authStore();
  const { theme } = themeStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const formValidate = () => {
    if (!formData.firstName) return toast.error("First name is required");
    if (!formData.email) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password should contain atleast 6 characters");

    return true;
  };

  const handleFormSubmit = async (e) => {
    // console.log("From is being submitted");
    e.preventDefault();
    const success = formValidate();
    if (success === true) {
      singUp(formData);
    }
  };

  return (
    <>
      <div className={`${css.bodyContainer} text-center`}>
        {/* left div container */}
        <div className={`${css.leftDivContainer}`}>
          <div>
            <IoChatbox className={`${css.logo}`} />

            <div className="fw-bold p-2">Create Account</div>
            <div>Start signing up to chat</div>
          </div>

          {/*  form container */}
          <form className={`text-center my-3`} onSubmit={handleFormSubmit}>
            <div className=" flex-col mb-3">
              <label htmlFor="firstName">First Name</label>
              <div
                style={{ width: "400px" }}
                className="d-flex flex-row align-items-center "
              >
                <FaUser style={{ marginRight: "8px" }} />
                <input
                  type="text"
                  className=" form-control  "
                  id="firstName"
                  placeholder="First Name"
                  onChange={(e) =>
                    setformData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex-col mb-3 ">
              <label htmlFor="lastName">Last Name</label>
              <div className="d-flex flex-row align-items-center ">
                <FaUser style={{ marginRight: "8px" }} />
                <input
                  type="text"
                  className="form-control "
                  id="lastName"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setformData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
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
                  className="border-0 ms-2"
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
              Create Account
            </button>
            {isSigning ? <Loader /> : null}
          </form>
          <div>
            <span>Already have an account ?</span>
            <Link to="/login" className="mx-2 ">
              Log in
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

export default SignUpPage;
