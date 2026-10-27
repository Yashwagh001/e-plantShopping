
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/CartSlice";
import "./ProductList.css";

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      {
        name: "Snake Plant",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee",
        cost: "$15",
      },
      {
        name: "Peace Lily",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee",
        cost: "$20",
      },
      {
        name: "Spider Plant",
        image: "https://images.unsplash.com/photo-1572688484438-313a6e50c0e7",
        cost: "$12",
      },
      {
        name: "Aloe Vera",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        cost: "$10",
      },
      {
        name: "Areca Palm",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
        cost: "$25",
      },
      {
        name: "Boston Fern",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
        cost: "$18",
      },
    ],
  },
  {
    category: "Aromatic Fragrant Plants",
    plants: [
      {
        name: "Lavender",
        image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec",
        cost: "$15",
      },
      {
        name: "Jasmine",
        image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",
        cost: "$18",
      },
      {
        name: "Rosemary",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
        cost: "$12",
      },
      {
        name: "Mint",
        image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733",
        cost: "$10",
      },
      {
        name: "Gardenia",
        image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",
        cost: "$22",
      },
      {
        name: "Lemon Balm",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        cost: "$14",
      },
    ],
  },
  {
    category: "Medicinal Plants",
    plants: [
      {
        name: "Tulsi",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        cost: "$10",
      },
      {
        name: "Neem",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
        cost: "$20",
      },
      {
        name: "Aloe Vera Medicinal",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        cost: "$12",
      },
      {
        name: "Ginger Plant",
        image: "https://images.unsplash.com/photo-1572688484438-313a6e50c0e7",
        cost: "$15",
      },
      {
        name: "Turmeric Plant",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
        cost: "$18",
      },
      {
        name: "Peppermint",
        image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733",
        cost: "$14",
      },
    ],
  },
];

function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const [addedToCart, setAddedToCart] = useState({});

  // Calculate total quantity of items in the Redux cart
  const totalCartItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Add plant to Redux cart
  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        ...plant,
        quantity: 1,
      })
    );

    setAddedToCart((previousState) => ({
      ...previousState,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-page">
      {/* Product Listing */}
      <div className="product-listing" id="plants">
        <h1 className="product-page-title">Our Plants</h1>

        <p className="product-page-subtitle">
          Bring nature into your home with our beautiful plants.
        </p>

        {/* Render Each Plant Category */}
        {plantsArray.map((category) => (
          <section
            className="plant-category"
            key={category.category}
          >
            {/* Category Heading */}
            <h2 className="category-name">
              {category.category}
            </h2>

            {/* Product List for Each Category */}
            <div className="product-list">
              {category.plants.map((plant) => (
                <div
                  className="product-card"
                  key={plant.name}
                >
                  {/* Plant Image */}
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="product-image"
                  />

                  {/* Plant Name */}
                  <h3 className="product-name">
                    {plant.name}
                  </h3>

                  {/* Plant Price */}
                  <p className="product-price">
                    {plant.cost}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    className="product-button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name]
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

