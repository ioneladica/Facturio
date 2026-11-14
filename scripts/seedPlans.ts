import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

const plans = [
  { id: "free", name: "Free", price: 0, billingPeriod: "MONTHLY", invoiceLimit: 5, isDefault: true, isActive: true },
  { id: "basic", name: "Basic", price: 49, billingPeriod: "MONTHLY", invoiceLimit: 30, isDefault: false, isActive: true },
  { id: "premium", name: "Premium", price: 99, billingPeriod: "MONTHLY", invoiceLimit: 100, isDefault: false, isActive: true },
  { id: "basic-annual", name: "Basic Annual", price: 490, billingPeriod: "YEARLY", invoiceLimit: 360, isDefault: false, isActive: true },
  { id: "premium-annual", name: "Premium Anual", price: 990, billingPeriod: "YEARLY", invoiceLimit: 1200, isDefault: false, isActive: true },
] as const;

async function main() {
  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.id },
      update: {},
      create: plan,
    });
  }
  const adminPasswordHash = await hashPassword(
    process.env.ADMIN_PASSWORD ?? "Admin123!",
  );
  await prisma.user.upsert({
    where: { id: "admin-demo" },
    update: {
      name: "Administrator",
      email: "admin@facturio.ro",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
    create: {
      id: "admin-demo",
      name: "Administrator",
      email: "admin@facturio.ro",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
  console.log("Planurile de abonament au fost inserate.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
