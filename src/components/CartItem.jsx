
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { removeItem, updateQuantity } from "../features/CartSlice";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-section">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR SELECTION</span>
          <h2>Shopping Cart</h2>
          <p>{totalItems} {totalItems === 1 ? "plant" : "plants"} in your cart</p>
        </div>
        <button className="continue-button" onClick={onContinueShopping}>
          <ArrowLeft size={17} /> Continue Shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={48} />
          <h3>Your cart is waiting for some green.</h3>
          <p>Explore our plant collection and find your new favorite.</p>
          <button className="primary-button" onClick={onContinueShopping}>
            Explore Plants
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <strong>₹{item.price}</strong>
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        dispatch(updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }))
                      }
                    >
                      <Minus size={15} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        dispatch(updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }))
                      }
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
                <div className="cart-row-end">
                  <strong>₹{item.price * item.quantity}</strong>
                  <button
                    className="remove-button"
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={17} /> Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Plants ({totalItems})</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-line">
              <span>Delivery</span>
              <span className="free-label">FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>₹{subtotal}</strong>
            </div>
            <button
              className="checkout-button"
              onClick={() => alert("Thank you for choosing Paradise Nursery!")}
            >
              Proceed to Checkout
            </button>
            <p className="summary-note">A little more green, delivered with care.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
