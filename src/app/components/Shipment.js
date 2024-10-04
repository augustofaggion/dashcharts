"use client";

import React from "react";
import { useEffect, useState } from "react";

const Shipment = () => {
  const [shipments, setShipments] = useState([]);
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
        setShipments(result.shipments); // Adjust this based on your API response structure
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
    <div >
      <h2>Shipment Table</h2>
      {shipments.map((shipment) => (
        <div key={shipment.shipment_id}>
          <h3>{shipment.shipment_date}</h3>
          <p>{shipment.origin}</p>
          <p>{shipment.destinantion}</p>
          <p>{shipment.status}</p>
          <p>{shipment.weight}</p>
        </div>
      ))}
    </div>
  );
}

export default Shipment;
