import { pool } from "../database/postgres.js";

export async function createTicket(issue){

 const result = await pool.query(
  "INSERT INTO tickets(issue) VALUES($1) RETURNING *",
  [issue]
 );

 return result.rows[0];
}