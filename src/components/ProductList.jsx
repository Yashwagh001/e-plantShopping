import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { addItem } from "../features/CartSlice";

const plantsArray = [
  // Air Purifying — 6 plants
  {
    id: 1,
    name: "Snake Plant",
    category: "Air Purifying",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=700&q=80",
    description:
      "A resilient plant with upright leaves, perfect for indoor spaces.",
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Air Purifying",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80",
    description: "Elegant green foliage with beautiful white flowers.",
  },
  {
    id: 3,
    name: "Spider Plant",
    category: "Air Purifying",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=80",
    description: "An easy-growing plant with attractive arching leaves.",
  },
  {
    id: 4,
    name: "Areca Palm",
    category: "Air Purifying",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7e2c3c5?auto=format&fit=crop&w=700&q=80",
    description: "A tropical palm that adds a fresh and lively touch.",
  },
  {
    id: 5,
    name: "Boston Fern",
    category: "Air Purifying",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1597055181300-6c9b1a9e6a6b?auto=format&fit=crop&w=700&q=80",
    description: "A lush fern with soft, delicate green fronds.",
  },
  {
    id: 6,
    name: "Dracaena",
    category: "Air Purifying",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80",
    description: "A stylish indoor plant with long decorative leaves.",
  },

  // Easy Care — 6 plants
  {
    id: 7,
    name: "Golden Pothos",
    category: "Easy Care",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80",
    description: "A trailing plant that looks beautiful on shelves.",
  },
  {
    id: 8,
    name: "ZZ Plant",
    category: "Easy Care",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1632207691143-643e2f6e7f9c?auto=format&fit=crop&w=700&q=80",
    description: "Glossy leaves and low-maintenance care.",
  },
  {
    id: 9,
    name: "Jade Plant",
    category: "Easy Care",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80",
    description: "A compact succulent with thick, rounded leaves.",
  },
  {
    id: 10,
    name: "Aloe Vera",
    category: "Easy Care",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=700&q=80",
    description: "A hardy succulent that thrives with minimal watering.",
  },
  {
    id: 11,
    name: "Rubber Plant",
    category: "Easy Care",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80",
    description: "Deep green foliage that adds character to a room.",
  },
  {
    id: 12,
    name: "Ponytail Palm",
    category: "Easy Care",
    price: 649,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80",
    description: "A unique plant with a distinctive bulb-shaped trunk.",
  },

  // Tropical — 6 plants
  {
    id: 13,
    name: "Monstera Deliciosa",
    category: "Tropical",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80",
    description: "Large split leaves create a bold tropical look.",
  },
  {
    id: 14,
    name: "Bird of Paradise",
    category: "Tropical",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1597055181300-6c9b1a9e6a6b?auto=format&fit=crop&w=700&q=80",
    description: "A statement plant with large, tropical leaves.",
  },
  {
    id: 15,
    name: "Calathea",
    category: "Tropical",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80",
    description: "Decorative foliage with beautiful natural patterns.",
  },
  {
    id: 16,
    name: "Philodendron",
    category: "Tropical",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80",
    description: "A lush tropical plant with attractive green leaves.",
  },
  {
    id: 17,
    name: "Anthurium",
    category: "Tropical",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=700&q=80",
    description: "A tropical plant known for its vibrant flowers.",
  },
  {
    id: 18,
    name: "Alocasia",
    category: "Tropical",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80",
    description: "A striking tropical plant with dramatic foliage.",
  },
];

const categories = [
  "All",
  "Air Purifying",
  "Easy Care",
  "Tropical",
];

export default function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? plantsArray
      : plantsArray.filter(
          (plant) => plant.category === selectedCategory
        );

  function handleAddToCart(plant) {
    dispatch(addItem(plant));
  }

  function isPlantInCart(plant) {
    return cartItems.some((item) => item.id === plant.id);
  }

  return (
    <section className="products-section" id="shop">
      <div className="products-heading">
        <span className="eyebrow">THE PLANT COLLECTION</span>

        <h1>Find Your Kind of Green</h1>

        <p>
          Bring home a little nature, one plant at a time.
        </p>

        <span className="product-count">
          {filteredProducts.length} plants
        </span>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category ? "active" : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((plant) => {
          const addedToCart = isPlantInCart(plant);

          return (
            <article className="product-card" key={plant.id}>
              <img
                src={plant.image}
                alt={plant.name}
                loading="lazy"
              />

              <div className="product-info">
                <span className="product-category">
                  {plant.category}
                </span>

                <h3>{plant.name}</h3>

                <p>{plant.description}</p>

                <div className="product-bottom">
                  <strong className="product-price">
                    ₹{plant.price}
                  </strong>

                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart}
                  >
                    <ShoppingCart size={16} />

                    {addedToCart
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}