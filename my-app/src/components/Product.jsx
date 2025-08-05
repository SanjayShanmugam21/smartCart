const Product = ({ product, addToCart }) => {
  const { name, brand, ram, storage, price, img } = product;

  return (
    <div className="bg-white p-4 md:p-5 hover:shadow-xl transition-all duration-200 rounded w-full">
      <img 
        src={img} 
        alt={name} 
        className="w-full h-40 md:h-48 object-contain mb-3 md:mb-4" 
      />

      <h3 className="text-base md:text-lg font-semibold mb-1 text-emerald-600">{name}</h3>
      <p className="text-sm md:text-base text-gray-600 mb-1">Brand: {brand}</p>
      <p className="text-sm md:text-base text-gray-600 mb-1">RAM: {ram}</p>
      <p className="text-sm md:text-base text-gray-600 mb-1">Storage: {storage}</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">
        <div>
          <p className="text-lg md:text-xl font-bold text-emerald-800">₹{price}</p>
          <p className="text-xs md:text-sm text-gray-400 line-through">₹{price + 100}</p>
        </div>
        <button
          className="bg-emerald-500 text-white text-sm md:text-base px-4 py-2 rounded hover:bg-emerald-700 transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
