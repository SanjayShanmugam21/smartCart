import React, { useState } from "react";
import './App.css';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Slidebar from "./components/Sidebar";
import products from './product.json';
import Cartbar from "./components/Cartbar";
import Footer from "./components/Footer";

const App = () => {
  const [priceRange, setPriceRange] = useState([
    Math.min(...products.map(p => p.price)),
    Math.max(...products.map(p => p.price))
  ]);
  
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
const [cartItems, setCartItems] = useState([]);
  const brands = [...new Set(products.map(p => p.brand))].sort();
const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  //  Filter Logic
  const filteredProducts = products.filter((product) => {
  const matchSearch =
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.ram.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.storage.toLowerCase().includes(searchQuery.toLowerCase());

  const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
  const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
  const matchRam = selectedRam == null || parseInt(product.ram) === selectedRam;
const matchStorage = selectedStorage == null || parseInt(product.storage) === selectedStorage;

  return matchSearch && matchBrand && matchPrice && matchRam && matchStorage;
});

const addToCart = (product) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(item => item.id === product.id);
    if (existingItem) {
      return prevItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prevItems, { ...product, quantity: 1 }];
    }
  });
  setCartSidebarOpen(true);
};

const removeFromCart = (id) => {
  setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
};

const updateCartItemQuantity = (id, quantity) => {
  if (quantity <= 0) {
    removeFromCart(id);
  } else {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }
};

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} cartItems={cartItems} cartSidebarOpen={cartSidebarOpen} setCartSidebarOpen={setCartSidebarOpen} />
      <div className="flex">
        <Slidebar
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
          selectedRam={selectedRam}
          setSelectedRam={setSelectedRam}
          setPriceRange={setPriceRange}
          brands={brands}
          priceRange={priceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />

        <div className="flex-1 bg-emerald-50 p-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products found matching your criteria.</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-emerald-600 p-4">Products ({filteredProducts.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProducts.map((product) => (
                  <Product
                    key={product.id}  product={product} addToCart={addToCart}/>
               ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Cartbar updateCartItemQuantity={updateCartItemQuantity} cartItems={cartItems}  cartSidebarOpen={cartSidebarOpen} setCartSidebarOpen={setCartSidebarOpen} removeFromCart={removeFromCart}/>  <Footer />
    </div>

    
  );
};

export default App;
