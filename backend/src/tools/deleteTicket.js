import { pool } from "../database/postgres.js";

export async function deleteTicket(id){

 await pool.query(
  "DELETE FROM tickets WHERE id=$1",
  [id]
 );

 return `Ticket ${id} deleted`;
}