import { pool } from "../database/postgres.js";

export async function listTickets(){

 const result = await pool.query(
  "SELECT * FROM tickets ORDER BY id DESC"
 );

 return result.rows;
}