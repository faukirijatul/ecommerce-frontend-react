import React from "react";
import Navbar from "../../../components/Navbar";
import SearchBar from "../../../components/SearchBar";
import { Outlet } from "react-router-dom";
import Footer from "../../../components/Footer";

const Layout = () => {
  return (
    <div className="px-4 sm:px-[5vm] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
