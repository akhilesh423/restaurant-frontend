import foodImage from "../Assests/foodImg.jpg";
import cake from "../Assests/christmas-cake.webp"
import soup from "../Assests/soup.jpg"
import drinks from "../Assests/drinks.jpg"
import biryani from "../Assests/biryani.jpg"
import pizza from "../Assests/pizza.webp"

const MenuItems = [
    {
        id: 1,
        category: "Starters",
        itemPrice: 299,
        itemName: "Garlic Bread",
        description: "Toasted bread with garlic and herb butter",
        image: cake
    },
    {
        id: 2,
        category: "Starters",
        itemPrice: 249,
        itemName: "Bruschetta",
        description: "Toasted bread topped with tomatoes, basil, and olive oil",
        image: soup
    },
    {
        id: 3,
        category: "Starters",
        itemPrice: 349,
        itemName: "Stuffed Mushrooms",
        description: "Mushroom caps filled with cheese and herbs, baked to perfection",
        image: drinks
    },
    {
        id: 4,
        category: "Starters",
        itemPrice: 399,
        itemName: "Chicken Wings",
        description: "Crispy chicken wings tossed in BBQ sauce",
        image: biryani
    },
    {
        id: 5,
        category: "Appetizers",
        itemPrice: 399,
        itemName: "Caprese Salad",
        description: "Fresh tomatoes, mozzarella cheese, basil, and balsamic glaze",
        image: pizza
    },
    {
        id: 6,
        category: "Appetizers",
        itemPrice: 349,
        itemName: "Crispy Calamari",
        description: "Fried calamari rings served with marinara sauce",
        image: foodImage
    },
    {
        id: 7,
        category: "Appetizers",
        itemPrice: 299,
        itemName: "Mozzarella Sticks",
        description: "Deep-fried breaded mozzarella cheese sticks, served with marinara sauce",
        image: cake
    },
    {
        id: 8,
        category: "Appetizers",
        itemPrice: 449,
        itemName: "Spinach Artichoke Dip",
        description: "Creamy spinach and artichoke dip served with tortilla chips",
        image: foodImage
    },
    {
        id: 9,
        category: "Main course",
        itemPrice: 599,
        itemName: "Spaghetti Carbonara",
        description: "Spaghetti pasta with creamy bacon and egg sauce",
        image: foodImage
    },
    {
        id: 10,
        category: "Main course",
        itemPrice: 549,
        itemName: "Grilled Salmon",
        description: "Grilled salmon fillet served with lemon butter sauce",
        image: cake
    },
    {
        id: 11,
        category: "Main course",
        itemPrice: 649,
        itemName: "Vegetable Stir-Fry",
        description: "Assorted vegetables stir-fried in a savory sauce",
        image: foodImage
    },
    {
        id: 12,
        category: "Main course",
        itemPrice: 699,
        itemName: "Chicken Parmesan",
        description: "Breaded chicken breast topped with marinara sauce and melted cheese, served with pasta",
        image: foodImage
    },
    {
        id: 13,
        category: "Soups",
        itemPrice: 249,
        itemName: "Tomato Basil Soup",
        description: "Classic tomato soup with basil flavor",
        image: foodImage
    },
    {
        id: 14,
        category: "Soups",
        itemPrice: 299,
        itemName: "Chicken Noodle Soup",
        description: "Hearty chicken soup with noodles and vegetables",
        image: foodImage
    },
    {
        id: 15,
        category: "Soups",
        itemPrice: 279,
        itemName: "Cream of Mushroom Soup",
        description: "Creamy mushroom soup with a hint of garlic",
        image: foodImage
    },
    {
        id: 16,
        category: "Soups",
        itemPrice: 269,
        itemName: "Minestrone Soup",
        description: "Italian-style vegetable soup with pasta and beans",
        image: cake
    },
    {
        id: 17,
        category: "Desserts",
        itemPrice: 199,
        itemName: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey chocolate center, served with vanilla ice cream",
        image: foodImage
    },
    {
        id: 18,
        category: "Desserts",
        itemPrice: 249,
        itemName: "New York Cheesecake",
        description: "Classic creamy cheesecake with graham cracker crust",
        image: biryani
    },
    {
        id: 19,
        category: "Desserts",
        itemPrice: 179,
        itemName: "Tiramisu",
        description: "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese",
        image: drinks
    },
    {
        id: 20,
        category: "Desserts",
        itemPrice: 229,
        itemName: "Apple Pie",
        description: "Traditional apple pie with flaky crust, served warm with a scoop of vanilla ice cream",
        image: foodImage
    },
    {
        id: 21,
        category: "Beverages",
        itemPrice: 99,
        itemName: "Iced Coffee",
        description: "Chilled coffee served with ice cubes",
        image: drinks
    },
    {
        id: 22,
        category: "Beverages",
        itemPrice: 149,
        itemName: "Mango Smoothie",
        description: "Refreshing smoothie made with fresh mangoes and yogurt",
        image: pizza
    },
    {
        id: 23,
        category: "Beverages",
        itemPrice: 79,
        itemName: "Lemonade",
        description: "Freshly squeezed lemonade served with ice",
        image: foodImage
    },
    {
        id: 24,
        category: "Beverages",
        itemPrice: 129,
        itemName: "Mojito",
        description: "Classic cocktail made with rum, mint, lime juice, and soda water",
        image: drinks
    }
];

export default MenuItems;
