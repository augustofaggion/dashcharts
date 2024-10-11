import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  const inventoryData = inventories.map((inventory) => ({
    item_name: inventory.item_name,
    quantity: inventory.quantity,
    location: inventory.location,
  }));

  return (
    <>
      <h2>Inventory Table</h2>
      <ResponsiveContainer width="100%" height="100%" aspect={4.0/2}>
        <BarChart width={500} height={300} data={inventoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="item_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
          <Bar dataKey="location" fill="#82ca9d" />
        </BarChart>
    </ResponsiveContainer>
    </>
  );
}

export default Inventory;

// Donut with d3
