import { prisma } from "../lib/prisma";

export class InvoiceItemAccessor {
  getByInvoice(invoiceId: string) {
    return prisma.invoiceItem.findMany({ where: { invoiceId } });
  }

  // totalPrice se calculează din cantitate * preț unitar
  add(data: {
    invoiceId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    serviceId?: string;
  }) {
    return prisma.invoiceItem.create({
      data: { ...data, totalPrice: data.quantity * data.unitPrice },
    });
  }

  async getTotalForInvoice(invoiceId: string) {
    const result = await prisma.invoiceItem.aggregate({
      where: { invoiceId },
      _sum: { totalPrice: true },
    });
    return result._sum.totalPrice ?? 0;
  }
}