import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Root = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );
  useEffect(() => {
    if (darkMode === true) {
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "dark");
      localStorage.setItem("theme", true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", "light");
      localStorage.setItem("theme", false);
    }
  }, [darkMode]);

  return (
    <>
      <header>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode}></Navbar>
      </header>

      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Root;
