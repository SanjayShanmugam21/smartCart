import React from "react";

const Cartbar = ({
  cartItems,
  cartSidebarOpen,
  setCartSidebarOpen,
  updateCartItemQuantity,
  removeFromCart,
}) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        cartSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg sm:text-xl font-bold text-emerald-600">
              Your Cart
            </div>
            <button
              className="text-gray-600 hover:text-gray-800 text-xl"
              onClick={() => setCartSidebarOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-emerald-600">
                      {item.name}
                    </h3>
                    <div className="text-gray-600 flex items-center flex-wrap gap-2 text-sm mt-1">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          updateCartItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <button
                        className="ml-2 text-red-500 text-xs sm:text-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <p className="text-lg sm:text-xl font-semibold text-right">
              Total: ₹{totalPrice.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartbar;
