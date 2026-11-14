import { UserAccessor } from "../accessors/UserAccessor";
import { SubscriptionPlanAccessor } from "../accessors/SubscriptionPlanAccessor";
import { UserSubscriptionAccessor } from "../accessors/UserSubscriptionAccessor";
import {
  userSubscriptionToPrismaData,
  userSubscriptionToViewModel,
  calculateSubscriptionEndDate,
  validateUserSubscription,
} from "../models/UserSubscriptionViewModel";
import type {
  UserSubscriptionErrors,
  UserSubscriptionViewModel,
} from "../models/UserSubscriptionViewModel";

export type UserSubscriptionPostResult = {
  ok: boolean;
  errors: UserSubscriptionErrors;
  values: UserSubscriptionViewModel;
};

function readFormValues(formData: FormData): UserSubscriptionViewModel {
  const read = (name: string) => String(formData.get(name) ?? "");
  return {
    userId: read("userId"),
    userName: "",
    planId: read("planId"),
    planName: "",
    status: read("status") as UserSubscriptionViewModel["status"],
    startDate: read("startDate"),
    endDate: read("endDate"),
  };
}

export class UserSubscriptionsController {
  private readonly accessor = new UserSubscriptionAccessor();
  private readonly users = new UserAccessor();
  private readonly plans = new SubscriptionPlanAccessor();

  async index(): Promise<UserSubscriptionViewModel[]> {
    const subscriptions = await this.accessor.getAll();
    return subscriptions.map(userSubscriptionToViewModel);
  }

  async details(id: string): Promise<UserSubscriptionViewModel | null> {
    const subscription = await this.accessor.getById(id);
    return subscription ? userSubscriptionToViewModel(subscription) : null;
  }

  async apiIndex(): Promise<UserSubscriptionViewModel[]> {
    return this.index();
  }

  async apiDetails(id: string): Promise<UserSubscriptionViewModel | null> {
    return this.details(id);
  }

  async apiCreate(input: {
    userId?: string;
    planId?: string;
    status?: string;
    startDate?: string;
  }): Promise<UserSubscriptionPostResult> {
    const formData = new FormData();
    formData.set("userId", input.userId ?? "");
    formData.set("planId", input.planId ?? "");
    formData.set("status", input.status ?? "");
    formData.set("startDate", input.startDate ?? "");
    return this.createPost(formData);
  }

  async apiUpdate(
    id: string,
    input: {
      userId?: string;
      planId?: string;
      status?: string;
      startDate?: string;
    },
  ): Promise<UserSubscriptionPostResult> {
    const formData = new FormData();
    formData.set("userId", input.userId ?? "");
    formData.set("planId", input.planId ?? "");
    formData.set("status", input.status ?? "");
    formData.set("startDate", input.startDate ?? "");
    return this.editPost(id, formData);
  }

  async createGet() {
    const [users, plans] = await Promise.all([
      this.users.getAll(),
      this.plans.getAll(),
    ]);
    return { users, plans };
  }

  async createPost(formData: FormData): Promise<UserSubscriptionPostResult> {
    return this.savePost(formData);
  }

  async editPost(
    id: string,
    formData: FormData,
  ): Promise<UserSubscriptionPostResult> {
    return this.savePost(formData, id);
  }

  private async savePost(
    formData: FormData,
    id?: string,
  ): Promise<UserSubscriptionPostResult> {
    const values = readFormValues(formData);
    const plan = values.planId ? await this.plans.getById(values.planId) : null;
    if (values.planId && !plan) {
      values.planId = "";
    }
    if (plan && values.startDate && !Number.isNaN(Date.parse(values.startDate))) {
      values.endDate = calculateSubscriptionEndDate(
        values.startDate,
        plan.billingPeriod,
      );
    }
    const errors = validateUserSubscription(values);
    if (Object.keys(errors).length > 0) return { ok: false, errors, values };

    if (id) {
      await this.accessor.update(id, userSubscriptionToPrismaData(values));
      values.id = id;
    } else {
      const created = await this.accessor.add(userSubscriptionToPrismaData(values));
      values.id = created.id;
    }
    return { ok: true, errors: {}, values };
  }

  async delete(id: string): Promise<void> {
    await this.accessor.remove(id);
  }
}
