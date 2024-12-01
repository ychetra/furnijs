import "./App.css";
import Index from "./pages/index";
import About from "./pages/about";
import Shop from "./pages/shop";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Services from "./pages/services";
import Thankyou from "./pages/thankyou";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    components: "buttons",
    "enable-funding": "paylater,venmo",
    "disable-funding": "card",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/services" element={<Services />} />
            <Route path="/thankyou" element={<Thankyou />} />
          </Routes>
        </Router>
      </CartProvider>
    </PayPalScriptProvider>
  );
}

export default App;
