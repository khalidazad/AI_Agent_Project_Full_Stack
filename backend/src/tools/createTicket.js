import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTicket(issue) {

  const ticket = await prisma.ticket.create({
    data: { issue }
  });

  return ticket;

}