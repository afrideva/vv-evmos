import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import App from "./App";
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const RouteLoading = () => {
  return "loading";
};
const createRoutes = (route) => {
  let routes = [];
  route.forEach((r) => {
    let element = (
      <React.Suspense fallback={<RouteLoading />}>{r.element}</React.Suspense>
    );
    routes.push(<Route key={r.path} path={r.path} element={element} />);
    if (r.children) {
      routes = routes.concat(createRoutes(r.children));
    }
  });
  return routes;
};
// import { navLinks } from "./dexeye/index.jsx";
// import { navLinks } from "./soar/index.jsx";
// import { navLinks } from "./vd/index.jsx";
import { navLinks } from "./ste/index.jsx";
// import  Header  from "./soar/comp/Header.jsx";



export const Wrapper = () => {
  let routes = createRoutes(navLinks);
  // <Route index element={<Home />} />
        // <Route path="/" element={<App Header={Header} navLinks={navLinks} />}>
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet/>}>
          {routes}
          <Route path="*" element={"not found"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
root.render(<Wrapper />);
