import { pool } from './backend/src/config/db';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

async function check() {
  try {
    const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'");
    console.log('Columns:', res.rows.map(r => r.column_name));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
check();
