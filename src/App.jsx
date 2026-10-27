import { useState } from "react";
import { useSelector } from "react-redux";
import { Leaf, ShoppingCart, House, Info } from "lucide-react";

import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import AboutUs from "./components/AboutUs";

import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleGetStartedClick = () => {
    setPage("shop");
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <button
          className="brand"
          onClick={() => setPage("home")}
          aria-label="Paradise Nursery Home"
        >
          <Leaf size={25} />
          <span>Paradise Nursery</span>
        </button>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>
            <House size={17} />
            Home
          </button>

          <button onClick={() => setPage("shop")}>
            Plants
          </button>

          <button onClick={() => setPage("about")}>
            <Info size={17} />
            About Us
          </button>

          <button
            className="cart-button"
            onClick={() => setPage("cart")}
          >
            <ShoppingCart size={19} />
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Home Page */}
        {page === "home" && (
          <section className="hero background-image">
            <div className="hero-content">
              <p className="eyebrow">BRING NATURE HOME</p>

              <h1>Welcome to Paradise Nursery</h1>

              <p>
                Discover beautiful indoor plants that bring life,
                freshness, and calm into your home.
              </p>

              <button
                className="primary-button"
                onClick={handleGetStartedClick}
              >
                Get Started <span>→</span>
              </button>
            </div>
          </section>
        )}

        {/* Plants Page */}
        {page === "shop" && <ProductList />}

        {/* About Us Page */}
        {page === "about" && <AboutUs />}

        {/* Cart Page */}
        {page === "cart" && (
          <CartItem
            onContinueShopping={() => setPage("shop")}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <Leaf size={18} />
        <span>
          Paradise Nursery — Grow your own paradise.
        </span>
      </footer>
    </div>
  );
}