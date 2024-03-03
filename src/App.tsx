import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/products";
import HomePage from "./pages/home";
import ProductCategoriesPage from "./pages/product-categories";
import CustomerPage from "./pages/companies";
import StorePage from "./pages/stores";
import NotFoundPage from "./pages/not-found";
import HomeTemplate from "./template/home-template";
import { ROUTER_LIST } from "./routers";

function App() {
  return (
    <div className="app">
      <HomeTemplate>
        <Routes>
          {ROUTER_LIST.map(({ path, component: Component, ...props }) => (
            <Route path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HomeTemplate>
    </div>
  );
}

export default App;
