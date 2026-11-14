import type { Prisma, SubscriptionPlan } from "@prisma/client";

export const BILLING_PERIODS = ["MONTHLY", "YEARLY"] as const;

export type BillingPeriod = (typeof BILLING_PERIODS)[number];

export type SubscriptionPlanViewModel = {
  id?: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: BillingPeriod;
  invoiceLimit: number;
  isDefault: boolean;
  isActive: boolean;
};

export type SubscriptionPlanErrors = Partial<
  Record<keyof SubscriptionPlanViewModel, string>
>;

export type SubscriptionPlanData = Omit<
  Prisma.SubscriptionPlanCreateInput,
  "createdAt" | "updatedAt"
>;

export function validateSubscriptionPlan(
  values: SubscriptionPlanViewModel,
): SubscriptionPlanErrors {
  const errors: SubscriptionPlanErrors = {};

  if (!values.name.trim()) {
    errors.name = "Numele este obligatoriu.";
  }
  if (!Number.isFinite(values.price) || values.price < 0) {
    errors.price = "Prețul trebuie să fie un număr mai mare sau egal cu 0.";
  }
  if (
    !Number.isInteger(values.invoiceLimit) ||
    values.invoiceLimit < 0
  ) {
    errors.invoiceLimit =
      "Limita de facturi trebuie să fie un număr întreg mai mare sau egal cu 0.";
  }
  if (!BILLING_PERIODS.includes(values.billingPeriod)) {
    errors.billingPeriod = "Perioada de facturare nu este validă.";
  }

  return errors;
}

export function subscriptionPlanToViewModel(
  plan: SubscriptionPlan,
): SubscriptionPlanViewModel {
  return {
    id: plan.id,
    name: plan.name,
    description: plan.description ?? "",
    price: Number(plan.price),
    billingPeriod: plan.billingPeriod as BillingPeriod,
    invoiceLimit: plan.invoiceLimit,
    isDefault: plan.isDefault,
    isActive: plan.isActive,
  };
}

export function subscriptionPlanToPrismaData(
  values: SubscriptionPlanViewModel,
): SubscriptionPlanData {
  return {
    name: values.name.trim(),
    description: values.description.trim() || null,
    price: values.price,
    billingPeriod: values.billingPeriod,
    invoiceLimit: values.invoiceLimit,
    isDefault: values.isDefault,
    isActive: values.isActive,
  };
}
