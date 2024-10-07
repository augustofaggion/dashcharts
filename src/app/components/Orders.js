"use client";
import React from 'react';
import {useEffect, useState} from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch deliveries data from the API route
    const fetchData = async () => {
      try {
        const response = await fetch('/api/db'); // Adjust this path if necessary
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        console.log(result);
        setOrders(result.orders); // Adjust this based on your API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>
  }


  return (
    <div>
      <h2>Orders Table</h2>
      {orders.map((order) => (
        <div key={order.order_id}>
          <h3>{order.customer_name}</h3>
          <p>{order.order_date}</p>
          <p>{order.shipment_id}</p>
          <p>{order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;

// chart with d3


