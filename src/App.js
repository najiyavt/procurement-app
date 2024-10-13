import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemMaster from "./components/ItemMaster";
import PurchaseOrder from "./components/PurchaseOrder";
import Navbar from "./components/Navbar";
// import '../src/styles/App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <Navbar className="navbar" />
      <div className="container mx-auto">
        <div className="content">
          <Routes>
            <Route path="/" element={<ItemMaster />} />
            <Route path="/purchase-order" element={<PurchaseOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
