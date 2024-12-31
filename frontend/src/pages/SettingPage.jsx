import React from "react";
import themeArr from "../lib/themeArray";
import { themeStore } from "../store/themeStore";

const SettingPage = () => {
  const { theme, setTheme } = themeStore();

  const handleThemeChange = (t) => {
    setTheme(t);
    // console.log(t);
    // console.log("theme is ", theme);
  };

  return (
    <>
      <div className="container min-vh-100">
        <div
          // style={{ margin: "auto" }}
          className="d-flex flex-column align-items-center mt-5"
        >
          <h3>Themes</h3>
          <p>Choose your desirable chat theme</p>
        </div>
        <div className=" d-flex flex-row gap-5 flex-wrap w-50 m-auto mt-4 pb-5">
          {themeArr.map((t) => {
            return (
              <button
                key={t}
                style={{
                  backgroundColor: t,
                  width: "50px",
                  height: "50px",
                }}
                className="rounded"
                onClick={() => handleThemeChange(t)}
              ></button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SettingPage;
