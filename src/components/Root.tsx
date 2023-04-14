import { Outlet, useLocation } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./Header";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

export const showNavBarState = atom({
  key: "showNavBarState",
  default: true,
});

export default function Root() {
  const [showNavBar, setShowNavBar] = useRecoilState(showNavBarState);
  const location = useLocation();

  // Roll back the showNavBar state when the user navigates away from the current screen
  useEffect(() => {
    setShowNavBar(() => true);
  }, [location.pathname, setShowNavBar]);
  return (
    <>
      {showNavBar && <Header />}
      <Outlet />
      {showNavBar && <NavBar />}
      <ReactQueryDevtools />
    </>
  );
}
