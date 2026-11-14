import { prisma } from "./lib/prisma";
import { InvoiceAccessor } from "./accessors/InvoiceAccessor";

async function main() {
  const clients = await prisma.client.findMany();
  console.log("Clienți:", clients);

  const invoices = new InvoiceAccessor();
  console.log("Facturi:", await invoices.getAll());
}

main().catch(console.error).finally(() => prisma.$disconnect());