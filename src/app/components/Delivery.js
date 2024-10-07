"use client";

import React from "react";
import { useEffect, useState } from "react";

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
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
        setDeliveries(result.deliveries); // Adjust this based on your API response structure
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
      <h2>Delivery Table</h2>
      {deliveries.map((delivery) => (
        <div key={delivery.delivery_id}>
          <h3>{delivery.shipment_id}</h3>
          <p>{delivery.delivery_date}</p>
          <p>{delivery.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Delivery;

// chart wiht chart js

