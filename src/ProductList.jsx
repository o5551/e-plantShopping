import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Import the addItem action

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Track added items
    const dispatch = useDispatch(); // Use Redux dispatch to update cart

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$18"
                }
            ]
        }
    ];

    // Function to handle adding plants to the cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Dispatch the addItem action to Redux
        setAddedToCart(prevState => ({
            ...prevState,
            [plant.name]: true
        }));
    };

    return (
        <div>
            <h2>Our Plants</h2>
            <div className="product-grid">
                {plantsArray.map((categoryObj, index) => (
                    <div key={index}>
                        <h3>{categoryObj.category}</h3>
                        <div className="plants-container">
                            {categoryObj.plants.map((plant, plantIndex) => (
                                <div className="plant-card" key={plantIndex}>
                                    <img src={plant.image} alt={plant.name} className="plant-image" />
                                    <h4>{plant.name}</h4>
                                    <p>{plant.description}</p>
                                    <p><strong>Price:</strong> {plant.cost}</p>
                                    <button 
                                        className="add-to-cart-button"
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={addedToCart[plant.name]}
                                    >
                                        {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
