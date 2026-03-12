import { createTicket } from "../tools/createTicket.js";
import { listTickets } from "../tools/listTickets.js";
import { deleteTicket } from "../tools/deleteTicket.js";

export const agent = {

 async invoke({ messages }){

  const message = messages[messages.length - 1].content.toLowerCase();

  if(message.includes("create ticket")){

   const issue = message.replace("create ticket","").trim();

   const ticket = await createTicket(issue);

   return { reply:`Ticket created with ID ${ticket.id}` };

  }

  if(message.includes("list tickets")){

   const tickets = await listTickets();

   return { reply: JSON.stringify(tickets,null,2) };

  }

  if(message.includes("delete ticket")){

   const id = message.match(/\d+/)?.[0];

   if(!id) return { reply:"Provide ticket id"};

   const result = await deleteTicket(id);

   return { reply: result };

  }

  return { reply:"I did not understand the request." };

 }
};