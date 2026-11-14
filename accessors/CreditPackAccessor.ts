import { prisma } from "../lib/prisma";
import type { CreditPackData } from "../models/CreditPackViewModel";

export class CreditPackAccessor {
  getAll() {
    return prisma.creditPack.findMany({
      orderBy: [{ price: "asc" }, { name: "asc" }],
    });
  }

  getById(id: string) {
    return prisma.creditPack.findUnique({ where: { id } });
  }

  add(data: CreditPackData) {
    return prisma.creditPack.create({ data });
  }

  update(id: string, data: CreditPackData) {
    return prisma.creditPack.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }
}
