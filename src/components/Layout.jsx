import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="mx-auto flex min-h-full max-w-[1440px] flex-col bg-white ">
      <Header />
      <div className="flex h-full grow flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
