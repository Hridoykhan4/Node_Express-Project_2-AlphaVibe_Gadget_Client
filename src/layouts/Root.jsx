import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>

      <main className="w-[95%] mx-auto">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Root;
