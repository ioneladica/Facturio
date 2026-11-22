export type BillingPeriod = "MONTHLY" | "YEARLY";

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: BillingPeriod;
  invoiceLimit: number;
  isDefault: boolean;
  isActive: boolean;
};

export type PlanInput = {
  name: string;
  description: string;
  price: number;
  billingPeriod: BillingPeriod;
  invoiceLimit: number;
  isDefault: boolean;
  isActive: boolean;
};
