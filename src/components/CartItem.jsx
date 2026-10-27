
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { removeItem, updateQuantity } from "../features/CartSlice";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0
  );

  function handleIncrement(item) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  }

  function handleDecrement(item) {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.id));
    }
  }

  function handleRemove(item) {
    dispatch(removeItem(item.id));
  }

  function handleCheckout() {
    alert("Thank you for choosing Paradise Nursery!");
  }

  return (
    <section className="cart-section cart-container">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR SELECTION</span>
          <h2>Shopping Cart</h2>

          <p>
            {totalItems} {totalItems === 1 ? "plant" : "plants"} in your cart
          </p>
        </div>

        <button
          className="get-started-button"
          onClick={onContinueShopping}
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={48} />

          <h3>Your cart is waiting for some green.</h3>

          <p>
            Explore our plant collection and find your new favorite.
          </p>

          <button
            className="primary-button"
            onClick={onContinueShopping}
          >
            Explore Plants
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <span className="product-category">
                    {item.category}
                  </span>

                  <h3 className="cart-item-name">
                    {item.name}
                  </h3>

                  <p className="cart-item-price">
                    ₹{item.cost} each
                  </p>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => handleDecrement(item)}
                    >
                      <Minus size={15} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => handleIncrement(item)}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="cart-row-end">
                  <strong>
                    ₹{item.cost * item.quantity}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item)}
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Plants ({totalItems})</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>₹{subtotal}</strong>
            </div>

            <button
              className="get-started-button1"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

            <p className="summary-note">
              A little more green, delivered with care.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
