// src/app/api/test-db/route.js
import { NextResponse } from 'next/server';
import { openDb } from '../../../lib/db';

// GET request handler for `/api/test-db`
export async function GET() {
  try {
    // Open a connection to the SQLite database
    const db = await openDb();

    // Run a simple query to get a list of all tables in the database
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");

    // Return the result as a JSON response
    return NextResponse.json({ status: 'success', tables });
  } catch (error) {
    // Return error if the connection fails
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
