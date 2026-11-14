import { prisma } from "../lib/prisma";
import type { UserSubscriptionData } from "../models/UserSubscriptionViewModel";

export class UserSubscriptionAccessor {
  getAll() {
    return prisma.userSubscription.findMany({
      include: { User: { select: { name: true } }, SubscriptionPlan: { select: { name: true } } },
      orderBy: { startDate: "desc" },
    });
  }

  add(data: UserSubscriptionData) {
    return prisma.userSubscription.create({ data });
  }

  getById(id: string) {
    return prisma.userSubscription.findUnique({
      where: { id },
      include: { User: { select: { name: true } }, SubscriptionPlan: { select: { name: true } } },
    });
  }

  update(id: string, data: UserSubscriptionData) {
    return prisma.userSubscription.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return prisma.userSubscription.delete({ where: { id } });
  }
}
