import {openDB} from './db';

// Query for deliveries
export async function getDeliveries() {
  const db = await openDB();
  return await db.all('SELECT * FROM deliveries');
}
