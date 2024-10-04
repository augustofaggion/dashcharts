// src/app/api/test-db/route.js
import { NextResponse } from 'next/server';
import { openDB } from '../../../lib/db';
import * as queries from '../../../lib/queries';


// GET request handler for `/api/test-db`
export async function GET() {
  try {
    const db = await openDB();
    // Open a connection to the SQLite database
    const deliveries = await queries.getDeliveries();
    const inventories = await queries.getInventories();
    const orders = await queries.getOrders();
    const shipments = await queries.getShipments();

    // Run a simple query to get a list of all tables in the database
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");

    // Return the result as a JSON response
    return NextResponse.json({ status: 'success', deliveries, inventories, orders, shipments});
  } catch (error) {
    // Return error if the connection fails
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
