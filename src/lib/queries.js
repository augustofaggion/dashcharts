import {openDB} from './db';

// Query for deliveries
export async function getDeliveries() {
  const db = await openDB();
  return await db.all('SELECT * FROM deliveries');
}

export async function getInventories() {
  const db = await openDB();
  return await db.all('SELECT * FROM inventory');
}

export async function getOrders( ) {
  const db = await openDB();
  return await db.all("SELECT * FROM orders");
}

export async function getShipments () {
  const db = await openDB();
  return await db.all("SELECT * FROM shipments");
}
