import { prisma } from "../lib/prisma";

const packs = [
  {
    id: "starter",
    name: "Starter",
    credits: 10,
    price: 29,
    description: "Pachet potrivit pentru primele facturi.",
    isActive: true,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 50,
    price: 119,
    description: "Mai multe credite pentru activitate constantă.",
    isActive: true,
  },
  {
    id: "mega",
    name: "Mega",
    credits: 200,
    price: 399,
    description: "Pachet generos pentru afaceri în creștere.",
    isActive: true,
  },
] as const;

async function main() {
  for (const pack of packs) {
    await prisma.creditPack.upsert({
      where: { id: pack.id },
      update: {},
      create: pack,
    });
  }
  console.log("Pachetele de credite au fost inserate.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
