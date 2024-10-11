"use client";
import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const Round = () => {
  const [value, setValue] = useState(0);

  // Example: Randomly set the value for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 100)); // Random value between 0 and 100
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const getColor = (value) => {
    if (value < 30) return "#FF0000"; // Red for values less than 30
    if (value < 70) return "#FFA500"; // Orange for values between 30 and 70
    return "#00FF00"; // Green for values 70 and above
  };

  return (
    <div>
      <h2>Full Gauge Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="80%"
          data={[{ name: "Value", value: value }]}
          startAngle={0}
          endAngle={360}
        >
          <RadialBar
            // minAngle={15}
            background
            clockWise
            dataKey="value"
            fill={getColor(value)} // Change color based on value
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <h3 style={{ fontSize: "24px" }}>{value}</h3>
    </div>
  );
};

export default Round;
