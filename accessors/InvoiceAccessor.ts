import { prisma } from "../lib/prisma";

export class InvoiceAccessor {
  getAll() {
    return prisma.invoice.findMany({ orderBy: { createdAt: "desc" } });
  }

  getById(id: string) {
    return prisma.invoice.findUnique({ where: { id } });
  }

  getByStatus(status: string) {
    return prisma.invoice.findMany({ where: { status } });
  }

  getByClient(clientId: string) {
    return prisma.invoice.findMany({ where: { clientId } });
  }

  // factura împreună cu liniile ei și clientul (folosește cheile străine)
  getWithItems(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: { InvoiceItem: true, Client: true },
    });
  }

  // creează o factură în stadiul DRAFT
  add(data: { userId: string; clientId: string; currency?: string; notes?: string }) {
    return prisma.invoice.create({ data });
  }

  // trece factura din DRAFT în ISSUED
  async issue(id: string) {
    const invoice = await prisma.invoice.findUnique({ where: { id } });
    if (!invoice || invoice.status !== "DRAFT") {
      throw new Error("Doar facturile DRAFT pot fi emise.");
    }
    return prisma.invoice.update({
      where: { id },
      data: { status: "ISSUED", issueDate: new Date() },
    });
  }
}