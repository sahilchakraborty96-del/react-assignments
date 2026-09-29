import { useState } from 'react';
import { CartProvider, useCart } from './CartContext';

const products = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
  },
  {
    id: 2,
    name: 'Mechanical Gaming Keyboard',
    category: 'Accessories',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
  },
  {
    id: 3,
    name: 'Ergonomic Optical Mouse',
    category: 'Accessories',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80',
  },
  {
    id: 4,
    name: '4K Ultra HD Computer Monitor',
    category: 'Electronics',
    price: 18499,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
  },
  {
    id: 5,
    name: 'Aluminum Laptop Stand',
    category: 'Office',
    price: 899,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80',
  },
  {
    id: 6,
    name: 'High-Speed USB-C Hub (7-in-1)',
    category: 'Office',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',
  },
];

function CartContent() {
  const { cart, dispatch, totalItems, subtotal, tax, grandTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    dispatch({ type: 'CLEAR_CART' });
    setTimeout(() => {
      setOrderPlaced(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="assignment-container">
      {/* Catalog Top bar */}
      <div className="section-header">
        <div>
          <h2>Product Catalog</h2>
          <p style={{ color: '#64748b' }}>State management via useContext & useReducer</p>
        </div>
        <button className="btn cart-badge-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart <span className="cart-counter">{totalItems}</span>
        </button>
      </div>

      {orderPlaced && (
        <div className="order-alert">
          🎉 Thank you! Your order has been placed successfully.
        </div>
      )}

      {/* Main Catalog Grid */}
      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-img" />
            <div className="product-info">
              <span className="product-cat">{item.category}</span>
              <h3>{item.name}</h3>
              <p className="product-price">₹{item.price.toLocaleString('en-IN')}</p>
              <button
                className="btn add-cart-btn"
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-out / Modal Cart Drawer */}
      {isCartOpen && (
        <div className="cart-modal-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h3>Shopping Cart ({totalItems})</h3>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                &times;
              </button>
            </div>

            <div className="cart-items-list">
              {cart.length === 0 ? (
                <p className="empty-cart-msg">Your shopping cart is currently empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-row">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <span className="cart-item-price">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-modal-footer">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-line">
                  <span>GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="summary-line total-line">
                  <strong>Grand Total</strong>
                  <strong>₹{grandTotal.toFixed(2)}</strong>
                </div>

                <div className="cart-actions">
                  <button className="btn checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShoppingCart() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}