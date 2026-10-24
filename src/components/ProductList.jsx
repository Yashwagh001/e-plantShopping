
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShoppingCart, Leaf } from "lucide-react";
import { addItem } from "../features/CartSlice";

const products = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Air Purifying",
    price: 499,
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=700&q=80",
    description: "A resilient plant for your home.",
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Air Purifying",
    price: 599,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80",
    description: "Elegant foliage for indoor spaces.",
  },
  {
    id: 3,
    name: "Monstera Deliciosa",
    category: "Tropical",
    price: 799,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80",
    description: "Beautiful split leaves for a bold look.",
  },
  {
    id: 4,
    name: "Golden Pothos",
    category: "Easy Care",
    price: 349,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80",
    description: "A trailing plant for shelves and corners.",
  },
  {
    id: 5,
    name: "ZZ Plant",
    category: "Easy Care",
    price: 449,
    image: "https://images.unsplash.com/photo-1632207691143-643e2f6e7f9c?auto=format&fit=crop&w=700&q=80",
    description: "Glossy leaves and easy plant care.",
  },
  {
    id: 6,
    name: "Rubber Plant",
    category: "Tropical",
    price: 699,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80",
    description: "Deep green foliage for your living room.",
  },
];

const categories = ["All", "Air Purifying", "Easy Care", "Tropical"];

export default function ProductList() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedId, setAddedId] = useState(null);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  function handleAddToCart(product) {
    dispatch(addItem(product));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <section className="products-section" id="shop">
      <div className="products-heading">
        <div>
          <span className="eyebrow">THE PLANT COLLECTION</span>
          <h2>Find your kind of green.</h2>
          <p>Bring home a little nature, one plant at a time.</p>
        </div>
        <span className="product-count">{filteredProducts.length} plants</span>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} loading="lazy" />
              <span className="product-tag">
                <Leaf size={13} /> Plant pick
              </span>
            </div>

            <div className="product-details">
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-card-bottom">
                <strong>₹{product.price}</strong>
                <button
                  className="add-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={16} />
                  {addedId === product.id ? "Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
