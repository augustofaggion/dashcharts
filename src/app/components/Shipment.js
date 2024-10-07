"use client";

import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2"; // Import chart components
import { Chart, registerables } from "chart.js";

// Register Chart.js modules
Chart.register(...registerables);

const Shipment = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch shipments data from the API route
    const fetchData = async () => {
      try {
        const response = await fetch("/api/db"); // Adjust this path if necessary
        if (!response.ok) throw new Error("Failed to fetch data");
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

  // Function to prepare chart data
  const getStatusChartData = () => {
    const statusCounts = shipments.reduce((acc, shipment) => {
      acc[shipment.status] = (acc[shipment.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: "Delivered",
          data: Object.values(statusCounts),
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
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
      <h2>Shipment Table</h2>


      {/* Render a bar chart using the data */}
      <div style={{ width: "800px", height: "400px"}}>
        <Bar data={getStatusChartData()} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Shipment;
