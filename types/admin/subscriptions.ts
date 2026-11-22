export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELLED"
  | "EXPIRED";

export type Subscription = {
  id: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
};

export type SubscriptionInput = {
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: string;
};
