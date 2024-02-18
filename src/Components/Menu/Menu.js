import React, { useState } from "react";
import "./Menu.css";
import foodImage from "../Assests/foodImg.jpg";

export default function Menu() {
    const menu = [
        {
            category: "Starters",
            itemPrice: 299,
            itemName: "Garlic Bread",
            description: "Toasted bread with garlic and herb butter",
            image: foodImage
        },
        {
            category: "Starters",
            itemPrice: 249,
            itemName: "Bruschetta",
            description: "Toasted bread topped with tomatoes, basil, and olive oil",
            image: foodImage
        },
        {
            category: "Starters",
            itemPrice: 349,
            itemName: "Stuffed Mushrooms",
            description: "Mushroom caps filled with cheese and herbs, baked to perfection",
            image: foodImage
        },
        {
            category: "Starters",
            itemPrice: 399,
            itemName: "Chicken Wings",
            description: "Crispy chicken wings tossed in BBQ sauce",
            image: foodImage
        },
        {
            category: "Appetizers",
            itemPrice: 399,
            itemName: "Caprese Salad",
            description: "Fresh tomatoes, mozzarella cheese, basil, and balsamic glaze",
            image: foodImage
        },
        {
            category: "Appetizers",
            itemPrice: 349,
            itemName: "Crispy Calamari",
            description: "Fried calamari rings served with marinara sauce",
            image: foodImage
        },
        {
            category: "Appetizers",
            itemPrice: 299,
            itemName: "Mozzarella Sticks",
            description: "Deep-fried breaded mozzarella cheese sticks, served with marinara sauce",
            image: foodImage
        },
        {
            category: "Appetizers",
            itemPrice: 449,
            itemName: "Spinach Artichoke Dip",
            description: "Creamy spinach and artichoke dip served with tortilla chips",
            image: foodImage
        },
        {
            category: "Main course",
            itemPrice: 599,
            itemName: "Spaghetti Carbonara",
            description: "Spaghetti pasta with creamy bacon and egg sauce",
            image: foodImage
        },
        {
            category: "Main course",
            itemPrice: 549,
            itemName: "Grilled Salmon",
            description: "Grilled salmon fillet served with lemon butter sauce",
            image: foodImage
        },
        {
            category: "Main course",
            itemPrice: 649,
            itemName: "Vegetable Stir-Fry",
            description: "Assorted vegetables stir-fried in a savory sauce",
            image: foodImage
        },
        {
            category: "Main course",
            itemPrice: 699,
            itemName: "Chicken Parmesan",
            description: "Breaded chicken breast topped with marinara sauce and melted cheese, served with pasta",
            image: foodImage
        },
        {
            category: "Soups",
            itemPrice: 249,
            itemName: "Tomato Basil Soup",
            description: "Classic tomato soup with basil flavor",
            image: foodImage
        },
        {
            category: "Soups",
            itemPrice: 299,
            itemName: "Chicken Noodle Soup",
            description: "Hearty chicken soup with noodles and vegetables",
            image: foodImage
        },
        {
            category: "Soups",
            itemPrice: 279,
            itemName: "Cream of Mushroom Soup",
            description: "Creamy mushroom soup with a hint of garlic",
            image: foodImage
        },
        {
            category: "Soups",
            itemPrice: 269,
            itemName: "Minestrone Soup",
            description: "Italian-style vegetable soup with pasta and beans",
            image: foodImage
        },
        {
            category: "Desserts",
            itemPrice: 199,
            itemName: "Chocolate Lava Cake",
            description: "Warm chocolate cake with a gooey chocolate center, served with vanilla ice cream",
            image: foodImage
        },
        {
            category: "Desserts",
            itemPrice: 249,
            itemName: "New York Cheesecake",
            description: "Classic creamy cheesecake with graham cracker crust",
            image: foodImage
        },
        {
            category: "Desserts",
            itemPrice: 179,
            itemName: "Tiramisu",
            description: "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese",
            image: foodImage
        },
        {
            category: "Desserts",
            itemPrice: 229,
            itemName: "Apple Pie",
            description: "Traditional apple pie with flaky crust, served warm with a scoop of vanilla ice cream",
            image: foodImage
        },
        {
            category: "Beverages",
            itemPrice: 99,
            itemName: "Iced Coffee",
            description: "Chilled coffee served with ice cubes",
            image: foodImage
        },
        {
            category: "Beverages",
            itemPrice: 149,
            itemName: "Mango Smoothie",
            description: "Refreshing smoothie made with fresh mangoes and yogurt",
            image: foodImage
        },
        {
            category: "Beverages",
            itemPrice: 79,
            itemName: "Lemonade",
            description: "Freshly squeezed lemonade served with ice",
            image: foodImage
        },
        {
            category: "Beverages",
            itemPrice: 129,
            itemName: "Mojito",
            description: "Classic cocktail made with rum, mint, lime juice, and soda water",
            image: foodImage
        },
    ];


    const [foodMenu, setFoodMenu] = useState(menu);
    const [category, setCategory] = useState("All");

    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    const uniqueCategories = Array.from(new Set(menu.map(item => item.category)));


    const filteredFoodMenu = category === "All" ? foodMenu : foodMenu.filter(item => item.category === category || category === "All");

    return (
        <div className="menu-container">
            <div className="category-container">
                <li>
                    <button className="category-button" onClick={() => handleCategoryClick("All")}>All</button>
                </li>
                {uniqueCategories.map((categoryName, index) => (
                    <li key={index}>
                        <button className="category-button" onClick={() => handleCategoryClick(categoryName)}>{categoryName}</button>
                    </li>
                ))}
            </div>
            <div className="fooditems-container">
                {filteredFoodMenu.map((item, index) => (
                    <div key={index} className="food-item-card">
                        <img className="food-image" src={item.image} alt={item.itemName} />
                        <div className="food-details">
                            <h3 className="food-name">{item.itemName}</h3>
                            <p className="food-price">Price: ${item.itemPrice}</p>
                            <p className="food-description">{item.description}</p>
                            <div className="button-container">
                                <button className="add-to-cart-button">-</button>
                                <span className="quantity">0</span>
                                <button className="add-to-cart-button">+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

