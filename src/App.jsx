
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

  return (
    <div className="app">
      <nav className="navbar">
        <button className="brand" onClick={() => setPage("home")}>
          <Leaf size={25} />
          <span>Paradise Nursery</span>
        </button>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>
            <House size={17} /> Home
          </button>
          <button onClick={() => setPage("shop")}>Plants</button>
          <button onClick={() => setPage("about")}>
            <Info size={17} /> About Us
          </button>
          <button className="cart-button" onClick={() => setPage("cart")}>
            <ShoppingCart size={19} /> Cart ({cartCount})
          </button>
        </div>
      </nav>

      <main>
        {page === "home" && (
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">BRING NATURE HOME</p>
              <h1>Make your space a little more green.</h1>
              <p>
                Discover beautiful indoor plants that bring life, freshness,
                and calm into your home.
              </p>
              <button className="primary-button" onClick={() => setPage("shop")}>
                Get Started <span>→</span>
              </button>
            </div>
          </section>
        )}

        {page === "shop" && (
          <ProductList />
        )}

        {page === "about" && (
          <AboutUs />
        )}

        {page === "cart" && (
          <CartItem onContinueShopping={() => setPage("shop")} />
        )}
      </main>

      <footer className="footer">
        <Leaf size={18} />
        <span>Paradise Nursery — Grow your own paradise.</span>
      </footer>
    </div>
  );
}
