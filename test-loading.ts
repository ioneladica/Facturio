import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  console.log("--- EAGER: factura + liniile dintr-un apel ---");
  const eager = await prisma.invoice.findFirst({
    include: { InvoiceItem: true },
  });
  console.log(eager?.InvoiceItem);

  console.log("--- LAZY: factura întâi, liniile doar la cerere ---");
  const invoice = await prisma.invoice.findFirst();
  console.log(invoice?.id);
  if (invoice) {
    const items = await prisma.invoiceItem.findMany({
      where: { invoiceId: invoice.id },
    });
    console.log(items);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());