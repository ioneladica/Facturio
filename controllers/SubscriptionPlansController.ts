import { SubscriptionPlanAccessor } from "../accessors/SubscriptionPlanAccessor";
import {
  SubscriptionPlanErrors,
  SubscriptionPlanViewModel,
  subscriptionPlanToPrismaData,
  subscriptionPlanToViewModel,
  validateSubscriptionPlan,
} from "../models/SubscriptionPlanViewModel";

export type SubscriptionPlanPostResult = {
  ok: boolean;
  errors: SubscriptionPlanErrors;
  values: SubscriptionPlanViewModel;
};

function readFormValues(formData: FormData): SubscriptionPlanViewModel {
  const readString = (name: string) =>
    String(formData.get(name) ?? "");
  const readNumber = (name: string) => Number(readString(name));

  return {
    name: readString("name"),
    description: readString("description"),
    price: readNumber("price"),
    billingPeriod: readString("billingPeriod") as SubscriptionPlanViewModel["billingPeriod"],
    invoiceLimit: readNumber("invoiceLimit"),
    isDefault: formData.get("isDefault") === "on",
    isActive: formData.get("isActive") === "on",
  };
}

export class SubscriptionPlansController {
  private readonly accessor = new SubscriptionPlanAccessor();

  async index(): Promise<SubscriptionPlanViewModel[]> {
    const plans = await this.accessor.getAll();
    return plans.map(subscriptionPlanToViewModel);
  }

  async details(id: string): Promise<SubscriptionPlanViewModel | null> {
    const plan = await this.accessor.getById(id);
    return plan ? subscriptionPlanToViewModel(plan) : null;
  }

  createGet(): SubscriptionPlanViewModel {
    return {
      name: "",
      description: "",
      price: 0,
      billingPeriod: "MONTHLY",
      invoiceLimit: 0,
      isDefault: false,
      isActive: true,
    };
  }

  async createPost(formData: FormData): Promise<SubscriptionPlanPostResult> {
    const values = readFormValues(formData);
    const errors = validateSubscriptionPlan(values);
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, values };
    }

    await this.accessor.add(subscriptionPlanToPrismaData(values));
    return { ok: true, errors: {}, values };
  }

  async editGet(id: string): Promise<SubscriptionPlanViewModel | null> {
    return this.details(id);
  }

  async editPost(
    id: string,
    formData: FormData,
  ): Promise<SubscriptionPlanPostResult> {
    const values = readFormValues(formData);
    const errors = validateSubscriptionPlan(values);
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, values };
    }

    await this.accessor.update(id, subscriptionPlanToPrismaData(values));
    return { ok: true, errors: {}, values };
  }

  async delete(id: string): Promise<void> {
    await this.accessor.remove(id);
  }
}
