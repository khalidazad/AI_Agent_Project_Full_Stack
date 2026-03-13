import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listTickets() {

  return await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" }
  });

}