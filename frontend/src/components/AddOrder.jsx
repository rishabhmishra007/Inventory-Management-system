import React, { useState } from 'react';
import '../css/AddOrder.css';

const AddOrder = () => {
  const [order, setOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order saved:', data);
        // Optionally reset the form after submission
        setOrder({ customerName: '', productName: '', quantity: '', price: '' });
      } else {
        console.error('Failed to save order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3>Add Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={order.customerName}
            onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={order.productName}
            onChange={(e) => setOrder({ ...order, productName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={order.price}
            onChange={(e) => setOrder({ ...order, price: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddOrder;
