// image import
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const { user, logOut, theme, setTheme } = useAuth() || {};

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("successfully Logout"))
      .catch((err) => toast.error(err));
    setUserOpen(false);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#FF497C] border-b-4 border-[#FF497C]"
              : "hover:text-[#FF497C]"
          }
        >
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/product/all"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#FF497C] border-b-4 border-[#FF497C]"
              : "hover:text-[#FF497C]"
          }
        >
          {({ isPending }) => (
            <span>
              All Products {isPending ? <span className="loading"></span> : ""}
            </span>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/product/add"
          end
          className={({ isActive }) =>
            isActive
              ? "text-[#FF497C] border-b-4 border-[#FF497C]"
              : "hover:text-[#FF497C]"
          }
        >
          <span>Add Product</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products/me"
          end
          className={({ isActive }) =>
            isActive
              ? "text-[#FF497C] border-b-4 border-[#FF497C]"
              : "hover:text-[#FF497C]"
          }
        >
          <span>My Products</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myCart"
          className={({ isActive, isPending }) =>
            isPending
              ? "loading loading-ball"
              : isActive
              ? "text-[#FF497C] border-b-4 border-[#FF497C]"
              : "hover:text-[#FF497C]"
          }
        >
          {({ isPending }) => (
            <span>
              My Cart {isPending ? <span className="loading"></span> : ""}
            </span>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "text-[#FF497C] border-b-4 border-[#FF497C]"
              : "hover:text-[#FF497C]"
          }
        >
          {({ isPending }) => (
            <span>
              Users {isPending ? <span className="loading"></span> : ""}
            </span>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <header className="shadow-lg flex mx-auto items-center justify-between w-[97%] ">
        <Link
          to="/"
          className="md:border-r border-pink-600 flex flex-shrink-0 items-center"
        >
          <img
            className="md:w-[200px] w-[150px] h-[70px] object-cover"
            src={logo}
            alt="LOGO"
          />
        </Link>
        {/* Right side */}
        <div className="relative ms-auto space-x-2  flex items-center justify-end w-full md:w-auto pl-2">
          <nav className=" lg:flex items-end font-medium   text-base hidden">
            <ul className="flex gap-8 items-center ml-4 xl:ml-8 mr-auto w-full justify-center dark:text-white">
              {links}
            </ul>
          </nav>

          <label className="toggle text-base-content">
            <input
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />
            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>
            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
          {user && user?.email ? (
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="border-2 cursor-pointer border-[#FF497C] rounded-full w-[40px]"
            >
              <img
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = "https://i.ibb.co.com/YFkNfDYg/cybepunk.jpg";
                }}
                referrerPolicy="no-referrer"
                src={user?.photoURL}
                alt={user?.displayName || user?.email}
                className="w-full h-full rounded-full"
              />
            </button>
          ) : (
            <button
              onClick={() => navigate("/signIn")}
              className="bg-[#FF497C] hover:bg-[#ab3154] duration-200 text-white font-bold px-4 xl:px-6 py-1 rounded"
            >
              Login
            </button>
          )}

          {/* user dropdown */}
          <div
            className={`absolute text-center ${
              userOpen ? "block" : "hidden"
            } flex dark:text-white flex-col text-black justify-center items-center gap-4 rounded shadow-lg bg-white dark:bg-[#120505] px-8 py-4 top-16 z-[100]`}
          >
            <p className="text-lg font-semibold">{user?.displayName}</p>

            <button
              onClick={handleLogOut}
              className="bg-[#FF497C] hover:bg-[#ab3154] duration-200 text-white font-bold px-4 xl:px-6 py-1 rounded cursor-pointer"
            >
              logout
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSideOpen(!sideOpen)}
          className="text-4xl cursor-pointer  text-[#FF497C] flex items-center lg:hidden ml-2"
        >
          <i className={`bx bx-${sideOpen ? "x" : "menu"}`}></i>
        </button>
      </header>

      {/* Side Menu */}
      <div
        className={`absolute ${
          sideOpen ? "top-0" : "-top-[1000px]"
        } lg:hidden bg-white shadow-lg w-56 h-full delay-200 ease-in-out duration-700 dark:bg-[#120505] dark:text-white z-50`}
      >
        <div
          onClick={() => setSideOpen(false)}
          className="text-right cursor-pointer pr-4 mt-3 text-red-600 text-xl font-bold"
        >
          X
        </div>

        <div className="p-4">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              className="w-[200px] h-[70px] object-cover"
              src={logo}
              alt=""
            />
          </Link>

          <ul className="mt-6 flex flex-col gap-4 ml-5">{links}</ul>
        </div>

        <div className="ml-8 mt-8">
          {user ? (
            <div className="flex flex-col gap-2 top-16 pr-5">
              <button className="border-2 mx-auto border-[#FF497C] rounded-full w-[40px]">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || logo}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </button>
              <p className="text-lg font-semibold text-center">
                {user?.displayName}
              </p>
              <button
                onClick={handleLogOut}
                className="bg-[#FF497C] hover:bg-[#ab3154] duration-200 text-white font-bold px-4 py-1 rounded"
              >
                logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signIn")}
              className="bg-[#FF497C] hover:bg-[#ab3154] duration-200 text-white font-bold px-4 xl:px-6 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* 🔥 Overlay to close drawer on outside click */}

      {sideOpen && (
        <div
          onClick={() => setSideOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
