import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home.js"
import Cart from './Components/Cart/Cart.js'
import { CartProvider } from "./Components/Context/cartContext.js"
import "./App.css"

function App() {
  return (


    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>



  );
}

export default App;
