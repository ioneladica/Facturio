import { prisma } from "../lib/prisma";

export type UserData = {
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  passwordHash?: string;
};

export class UserAccessor {
  getAll() {
    return prisma.user.findMany({ orderBy: [{ name: "asc" }, { email: "asc" }] });
  }

  getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  add(data: UserData & { passwordHash: string }) {
    return prisma.user.create({ data });
  }

  update(id: string, data: UserData) {
    return prisma.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  remove(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
