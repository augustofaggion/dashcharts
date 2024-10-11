"use client";

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components with Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  // Function to format data for the pie chart
  const getChartData = () => {
    // Calculate counts of each order status
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCounts), // Status labels for each slice
      datasets: [
        {
          label: 'Order Status Distribution',
          data: Object.values(statusCounts), // Corresponding counts for each status
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
      {/* Render the Pie chart below */}
      <div style={{ width: '500px', margin: '20px auto' }}>
        <Pie data={getChartData()} />
      </div>
    </div>
  );
};

export default Orders;
