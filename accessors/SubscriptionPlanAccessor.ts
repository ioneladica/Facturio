import { prisma } from "../lib/prisma";
import { SubscriptionPlanData } from "../models/SubscriptionPlanViewModel";

export class SubscriptionPlanAccessor {
  getAll() {
    return prisma.subscriptionPlan.findMany({
      orderBy: [{ price: "asc" }, { name: "asc" }],
    });
  }

  getById(id: string) {
    return prisma.subscriptionPlan.findUnique({ where: { id } });
  }

  add(data: SubscriptionPlanData) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.subscriptionPlan.updateMany({
          where: { isDefault: true },
          data: { isDefault: false },
        });
      }
      return transaction.subscriptionPlan.create({ data });
    });
  }

  update(id: string, data: SubscriptionPlanData) {
    return prisma.$transaction(async (transaction) => {
      if (data.isDefault) {
        await transaction.subscriptionPlan.updateMany({
          where: { isDefault: true, id: { not: id } },
          data: { isDefault: false },
        });
      }
      return transaction.subscriptionPlan.update({
        where: { id },
        data: { ...data, updatedAt: new Date() },
      });
    });
  }

  remove(id: string) {
    return prisma.subscriptionPlan.delete({ where: { id } });
  }
}
