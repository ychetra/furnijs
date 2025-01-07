import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Menu() {
  const { cartCount } = useCart();

  return (
    <>
        <div className="container">
        <Link className="navbar-brand" to="/">Tra<span>.</span></Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsTra"
          aria-controls="navbarsTra"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsTra">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li><Link className="nav-link" to="/shop">Shop</Link></li>
            <li><Link className="nav-link" to="/about">About us</Link></li>
            <li><Link className="nav-link" to="/services">Services</Link></li>
            <li><Link className="nav-link" to="/blog">Blog</Link></li>
            <li><Link className="nav-link" to="/contact">Contact us</Link></li>
          </ul>

          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            <li>
              <Link className="nav-link" to="#"><img src="/reactjs/assets/images/user.svg" /></Link>
            </li>
            <li style={{ position: 'relative' }}>
              <Link className="nav-link" to="/cart">
                <img src="/reactjs/assets/images/cart.svg" />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '90%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '0 4px',
                    fontSize: '11px',
                    minWidth: '16px',
                    height: '16px',
                    lineHeight: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </>
  );
}

export default Menu;
