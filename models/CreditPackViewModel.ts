import type { CreditPack, Prisma } from "@prisma/client";

export type CreditPackViewModel = {
  id?: string;
  name: string;
  description: string;
  credits: number;
  price: number;
  isActive: boolean;
};

export type CreditPackErrors = Partial<
  Record<keyof CreditPackViewModel, string>
>;

export type CreditPackData = Omit<
  Prisma.CreditPackCreateInput,
  "createdAt" | "updatedAt"
>;

export function validateCreditPack(
  values: CreditPackViewModel,
): CreditPackErrors {
  const errors: CreditPackErrors = {};

  if (!values.name.trim()) {
    errors.name = "Numele este obligatoriu.";
  }
  if (!Number.isInteger(values.credits) || values.credits < 1) {
    errors.credits =
      "Numărul de credite trebuie să fie un număr întreg mai mare sau egal cu 1.";
  }
  if (!Number.isFinite(values.price) || values.price < 0) {
    errors.price = "Prețul trebuie să fie un număr mai mare sau egal cu 0.";
  }

  return errors;
}

export function creditPackToViewModel(
  pack: CreditPack,
): CreditPackViewModel {
  return {
    id: pack.id,
    name: pack.name,
    description: pack.description ?? "",
    credits: pack.credits,
    price: Number(pack.price),
    isActive: pack.isActive,
  };
}

export function creditPackToPrismaData(
  values: CreditPackViewModel,
): CreditPackData {
  return {
    name: values.name.trim(),
    credits: values.credits,
    price: values.price,
    description: values.description.trim() || null,
    isActive: values.isActive,
  };
}
