import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/home";

import Addproduct from "./Admin/Addproduct";
import ProductList from "./Admin/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* admin routes */}
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/allproduct" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
