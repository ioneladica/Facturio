import type { Prisma, UserSubscription } from "@prisma/client";

export const SUBSCRIPTION_STATUSES = ["ACTIVE", "CANCELLED", "EXPIRED"] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export type UserSubscriptionViewModel = {
  id?: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
};

function formatDateTime(value: Date): string {
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${value.getUTCFullYear()}-${pad(value.getUTCMonth() + 1)}-${pad(value.getUTCDate())}T${pad(value.getUTCHours())}:${pad(value.getUTCMinutes())}`;
}

function parseDateTime(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) return new Date("invalid");
  return new Date(Date.UTC(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
  ));
}

export function calculateSubscriptionEndDate(
  startDate: string,
  billingPeriod: string,
): string {
  const endDate = parseDateTime(startDate);
  const day = endDate.getUTCDate();
  endDate.setUTCDate(1);
  endDate.setUTCMonth(
    endDate.getUTCMonth() + (billingPeriod === "YEARLY" ? 12 : 1),
  );
  const lastDayOfMonth = new Date(
    Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, 0),
  ).getUTCDate();
  endDate.setUTCDate(Math.min(day, lastDayOfMonth));
  return formatDateTime(endDate);
}

export type UserSubscriptionErrors = Partial<
  Record<keyof UserSubscriptionViewModel, string>
>;

export type UserSubscriptionData = Omit<
  Prisma.UserSubscriptionCreateInput,
  "createdAt" | "updatedAt" | "User" | "SubscriptionPlan"
> & {
  User: { connect: { id: string } };
  SubscriptionPlan: { connect: { id: string } };
};

export function validateUserSubscription(
  values: UserSubscriptionViewModel,
): UserSubscriptionErrors {
  const errors: UserSubscriptionErrors = {};
  if (!values.userId) errors.userId = "Utilizatorul este obligatoriu.";
  if (!values.planId) errors.planId = "Planul este obligatoriu.";
  if (!values.startDate || Number.isNaN(parseDateTime(values.startDate).getTime())) {
    errors.startDate = "Data de început este obligatorie.";
  }
  if (values.endDate && Number.isNaN(parseDateTime(values.endDate).getTime())) {
    errors.endDate = "Data de sfârșit nu este validă.";
  }
  if (
    values.startDate &&
    values.endDate &&
    parseDateTime(values.endDate).getTime() < parseDateTime(values.startDate).getTime()
  ) {
    errors.endDate = "Data de sfârșit trebuie să fie după început.";
  }
  if (!SUBSCRIPTION_STATUSES.includes(values.status)) {
    errors.status = "Statusul nu este valid.";
  }
  return errors;
}

export function userSubscriptionToViewModel(
  subscription: UserSubscription & {
    User: { name: string };
    SubscriptionPlan: { name: string };
  },
): UserSubscriptionViewModel {
  return {
    id: subscription.id,
    userId: subscription.userId,
    userName: subscription.User.name,
    planId: subscription.planId,
    planName: subscription.SubscriptionPlan.name,
    status: subscription.status as SubscriptionStatus,
    startDate: formatDateTime(subscription.startDate),
    endDate: subscription.endDate
      ? formatDateTime(subscription.endDate)
      : "",
  };
}

export function userSubscriptionToPrismaData(
  values: UserSubscriptionViewModel,
): UserSubscriptionData {
  return {
    User: { connect: { id: values.userId } },
    SubscriptionPlan: { connect: { id: values.planId } },
    status: values.status,
    startDate: parseDateTime(values.startDate),
    endDate: values.endDate ? parseDateTime(values.endDate) : null,
  };
}
