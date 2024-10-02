// src/app/page.js
"use client";  // This line must be the first line of your component file

import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
import Delivery from './components/Delivery';

const Page = () => {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('/api/db');  // Fetch from your API route
        const data = await response.json();

        if (response.ok) {
          setTables(data.deliveries); // Assuming your API returns an object with a `tables` property
        } else {
          setError(data.message); // Handle API errors
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Database Tables</h1>


      <Delivery />
    </div>
  );
};

export default Page;
