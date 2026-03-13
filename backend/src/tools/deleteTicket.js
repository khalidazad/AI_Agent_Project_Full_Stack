import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteTicket(id) {

  await prisma.ticket.delete({
    where: { id: Number(id) }
  });

  return "Ticket deleted";

}