import React, { useEffect, useState } from "react";

const Inventory = () => {  // Corrected component declaration
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/db');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        console.log(result);
        setInventories(result.inventories);
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
      <h2>Inventory Table</h2>
      {inventories.map((inventory) => (
        <div key={inventory.item_id}>
          <h3>{inventory.item_name}</h3>
          <p>{inventory.quantity}</p>
          <p>{inventory.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Inventory;

// Donut with d3
