import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <nav className="navigation">
            <Link to="/" className="nav-link">Item Master</Link>
            <Link to="/purchase-order" className="nav-link">Purchase Order</Link>
        </nav>
    );
};

export default Navbar;
