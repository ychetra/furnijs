import React from "react";
import Menu from "./menu";
import { cartAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function Checkout() {
  const cartItems = cartAPI.getCartItems();
  const navigate = useNavigate();
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePaypalSuccess = (details) => {
    localStorage.removeItem("cartItems");
    navigate("/thankyou");
  };

  console.log("Cart Items:", cartItems);
  console.log("Subtotal:", calculateSubtotal());
  console.log("PayPal Script Status:", { isPending, isResolved, isRejected });

  return (
    <>
      <nav
        className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
        arial-label="Tra navigation bar"
      >
        <Menu />
      </nav>

      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Checkout</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>

      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="border p-4 rounded" role="alert">
                Returning customer? <a href="#">Click here</a> to login
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              <div className="p-3 p-lg-5 border bg-white">
                <div className="form-group">
                  <label for="c_country" className="text-black">
                    Country <span className="text-danger">*</span>
                  </label>
                  <select id="c_country" className="form-control">
                    <option value="1">Select a country</option>
                    <option value="2">Cambodia</option>
                    <option value="3">Algeria</option>
                    <option value="4">Afghanistan</option>
                    <option value="5">Ghana</option>
                    <option value="6">Albania</option>
                    <option value="7">Bahrain</option>
                    <option value="8">Colombia</option>
                    <option value="9">Dominican Republic</option>
                  </select>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label for="c_fname" className="text-black">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_fname"
                      name="c_fname"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="c_lname" className="text-black">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_lname"
                      name="c_lname"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label for="c_companyname" className="text-black">
                      Company Name{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_companyname"
                      name="c_companyname"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label for="c_address" className="text-black">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_address"
                      name="c_address"
                      placeholder="Street address"
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label for="c_state_country" className="text-black">
                      State / Country <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_state_country"
                      name="c_state_country"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="c_postal_zip" className="text-black">
                      Posta / Zip <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_postal_zip"
                      name="c_postal_zip"
                    />
                  </div>
                </div>

                <div className="form-group row mb-5">
                  <div className="col-md-6">
                    <label for="c_email_address" className="text-black">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_email_address"
                      name="c_email_address"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="c_phone" className="text-black">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_phone"
                      name="c_phone"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    for="c_create_account"
                    className="text-black"
                    data-bs-toggle="collapse"
                    href="#create_an_account"
                    role="button"
                    aria-expanded="false"
                    aria-controls="create_an_account"
                  >
                    <input type="checkbox" value="1" id="c_create_account" />{" "}
                    Create an account?
                  </label>
                  <div className="collapse" id="create_an_account">
                    <div className="py-2 mb-4">
                      <p className="mb-3">
                        Create an account by entering the information below. If
                        you are a returning customer please login at the top of
                        the page.
                      </p>
                      <div className="form-group">
                        <label for="c_account_password" className="text-black">
                          Account Password
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="c_account_password"
                          name="c_account_password"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    for="c_ship_different_address"
                    className="text-black"
                    data-bs-toggle="collapse"
                    href="#ship_different_address"
                    role="button"
                    aria-expanded="false"
                    aria-controls="ship_different_address"
                  >
                    <input
                      type="checkbox"
                      value="1"
                      id="c_ship_different_address"
                    />{" "}
                    Ship To A Different Address?
                  </label>
                  <div className="collapse" id="ship_different_address">
                    <div className="py-2">
                      <div className="form-group">
                        <label for="c_diff_country" className="text-black">
                          Country <span className="text-danger">*</span>
                        </label>
                        <select id="c_diff_country" className="form-control">
                          <option value="1">Select a country</option>
                          <option value="2">bangladesh</option>
                          <option value="3">Algeria</option>
                          <option value="4">Afghanistan</option>
                          <option value="5">Ghana</option>
                          <option value="6">Albania</option>
                          <option value="7">Bahrain</option>
                          <option value="8">Colombia</option>
                          <option value="9">Dominican Republic</option>
                        </select>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-6">
                          <label for="c_diff_fname" className="text-black">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_fname"
                            name="c_diff_fname"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="c_diff_lname" className="text-black">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_lname"
                            name="c_diff_lname"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-12">
                          <label
                            for="c_diff_companyname"
                            className="text-black"
                          >
                            Company Name{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_companyname"
                            name="c_diff_companyname"
                          />
                        </div>
                      </div>

                      <div className="form-group row  mb-3">
                        <div className="col-md-12">
                          <label for="c_diff_address" className="text-black">
                            Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_address"
                            name="c_diff_address"
                            placeholder="Street address"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Apartment, suite, unit etc. (optional)"
                        />
                      </div>

                      <div className="form-group row">
                        <div className="col-md-6">
                          <label
                            for="c_diff_state_country"
                            className="text-black"
                          >
                            State / Country{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_state_country"
                            name="c_diff_state_country"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="c_diff_postal_zip" className="text-black">
                            Posta / Zip <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_postal_zip"
                            name="c_diff_postal_zip"
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-5">
                        <div className="col-md-6">
                          <label
                            for="c_diff_email_address"
                            className="text-black"
                          >
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_email_address"
                            name="c_diff_email_address"
                          />
                        </div>
                        <div className="col-md-6">
                          <label for="c_diff_phone" className="text-black">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="c_diff_phone"
                            name="c_diff_phone"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label for="c_order_notes" className="text-black">
                    Order Notes
                  </label>
                  <textarea
                    name="c_order_notes"
                    id="c_order_notes"
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Write your notes here..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                  <div className="p-3 p-lg-5 border bg-white">
                    <label for="c_code" className="text-black mb-3">
                      Enter your coupon code if you have one
                    </label>
                    <div className="input-group w-75 couponcode-wrap">
                      <input
                        type="text"
                        className="form-control me-2"
                        id="c_code"
                        placeholder="Coupon Code"
                        aria-label="Coupon Code"
                        aria-describedby="button-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-black btn-sm"
                          type="button"
                          id="button-addon2"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border bg-white">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              {item.title} <strong className="mx-2">x</strong>{" "}
                              {item.quantity}
                            </td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Cart Subtotal</strong>
                          </td>
                          <td className="text-black">${calculateSubtotal()}</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Order Total</strong>
                          </td>
                          <td className="text-black font-weight-bold">
                            <strong>${calculateSubtotal()}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">Payment Method</h3>
                      <div className="py-2">
                        {isPending && <div>Loading PayPal...</div>}
                        {isRejected && <div>Failed to load PayPal</div>}
                        {cartItems.length === 0 && <p>Your cart is empty</p>}
                        {cartItems.length > 0 && isResolved && (
                          <PayPalButtons
                            forceReRender={[calculateSubtotal()]}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: calculateSubtotal(),
                                      currency_code: "USD",
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={async (data, actions) => {
                              const details = await actions.order.capture();
                              handlePaypalSuccess(details);
                            }}
                            onError={(err) => {
                              console.error("PayPal Error:", err);
                              alert(
                                "There was an error processing your payment. Please try again."
                              );
                            }}
                            style={{
                              layout: "vertical",
                              shape: "rect",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-section">
        <div className="container relative">
          <div className="sofa-img">
            <img
              scr="reactjs/assets/images/sofa.png"
              alt="Image"
              className="img-fluid"
            />
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="subscription-form">
                <h3 className="d-flex align-items-center">
                  <span className="me-1">
                    <img
                      scr="reactjs/assets/images/envelope-outline.svg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </span>
                  <span>Subscribe to Newsletter</span>
                </h3>

                <form action="#" className="row g-3">
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-primary">
                      <span className="fa fa-paper-plane"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="row g-5 mb-5">
            <div className="col-lg-4">
              <div className="mb-4 footer-logo-wrap">
                <a href="#" className="footer-logo">
                  Tra<span>.</span>
                </a>
              </div>
              <p className="mb-4">
                Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                vulputate velit imperdiet dolor tempor tristique. Pellentesque
                habitant
              </p>

              <ul className="list-unstyled custom-social">
                <li>
                  <a href="#">
                    <span className="fa fa-brands fa-facebook-f"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-brands fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-brands fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fa fa-brands fa-linkedin"></span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-8">
              <div className="row links-wrap">
                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Support</a>
                    </li>
                    <li>
                      <a href="#">Knowledge base</a>
                    </li>
                    <li>
                      <a href="#">Live chat</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Jobs</a>
                    </li>
                    <li>
                      <a href="#">Our team</a>
                    </li>
                    <li>
                      <a href="#">Leadership</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Nordic Chair</a>
                    </li>
                    <li>
                      <a href="#">Kruzo Aero</a>
                    </li>
                    <li>
                      <a href="#">Ergonomic Chair</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top copyright">
            <div className="row pt-4">
              <div className="col-lg-6">
                <p className="mb-2 text-center text-lg-start">
                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script>.
                  All Rights Reserved. &mdash; Designed with love by{" "}
                  <a href="https://untree.co">Untree.co</a> Distributed By{" "}
                  <a hreff="https://themewagon.com">ThemeWagon</a>
                </p>
              </div>

              <div className="col-lg-6 text-center text-lg-end">
                <ul className="list-unstyled d-inline-flex ms-auto">
                  <li className="me-4">
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <script scr="reactjs/assets/js/bootstrap.bundle.min.js"></script>
      <script scr="reactjs/assets/js/tiny-slider.js"></script>
      <script scr="reactjs/assets/js/custom.js"></script>
    </>
  );
}

export default Checkout;
