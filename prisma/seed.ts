import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: "u1" },
    update: {},
    create: {
      id: "u1",
      name: "Ionela Dica",
      email: "ionela@test.ro",
      passwordHash: "hash_test",
    },
  });

  await prisma.client.upsert({
    where: { id: "c1" },
    update: {},
    create: { id: "c1", userId: "u1", name: "SC Alfa SRL", email: "office@alfa.ro", taxId: "RO111" },
  });
  await prisma.client.upsert({
    where: { id: "c2" },
    update: {},
    create: { id: "c2", userId: "u1", name: "SC Beta SRL", email: "office@beta.ro", taxId: "RO222" },
  });

  await prisma.invoice.upsert({
    where: { id: "i1" },
    update: {},
    create: {
      id: "i1",
      userId: "u1",
      clientId: "c1",
      invoiceNumber: 1,
      subtotal: 100,
      taxAmount: 19,
      totalAmount: 119,
    },
  });
  await prisma.invoiceItem.upsert({
    where: { id: "ii1" },
    update: {},
    create: {
      id: "ii1",
      invoiceId: "i1",
      description: "Consultanta IT",
      quantity: 1,
      unitPrice: 100,
      totalPrice: 100,
    },
  });

  console.log("Seed terminat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());