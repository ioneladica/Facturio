"use client";

import type {
  SubscriptionInput,
  SubscriptionStatus,
} from "../../../types/admin/subscriptions";
import type { User } from "../../../types/admin/users";
import type { Plan } from "../../../types/admin/plans";
import FieldError from "../../common/FieldError";

export type SubscriptionErrors = Partial<
  Record<keyof SubscriptionInput, string>
>;

type SubscriptionFieldsProps = {
  values: SubscriptionInput;
  errors: SubscriptionErrors;
  users: User[];
  plans: Plan[];
  endDate: string;
  setField: <K extends keyof SubscriptionInput>(
    field: K,
    value: SubscriptionInput[K],
  ) => void;
};

export default function SubscriptionFields({
  values,
  errors,
  users,
  plans,
  endDate,
  setField,
}: SubscriptionFieldsProps) {
  return (
    <>
      <label>
        Utilizator
        <select
          name="userId"
          value={values.userId}
          onChange={(event) => setField("userId", event.target.value)}
        >
          <option value="">Selectează utilizatorul</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <FieldError error={errors.userId} />
      </label>
      <label>
        Plan
        <select
          name="planId"
          value={values.planId}
          onChange={(event) => setField("planId", event.target.value)}
        >
          <option value="">Selectează planul</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} ({plan.billingPeriod === "YEARLY" ? "anual" : "lunar"})
            </option>
          ))}
        </select>
        <FieldError error={errors.planId} />
      </label>
      <label>
        Status
        <select
          name="status"
          value={values.status}
          onChange={(event) =>
            setField("status", event.target.value as SubscriptionStatus)
          }
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="EXPIRED">EXPIRED</option>
        </select>
        <FieldError error={errors.status} />
      </label>
      <label>
        Data început
        <input
          name="startDate"
          type="datetime-local"
          value={values.startDate}
          onChange={(event) => setField("startDate", event.target.value)}
        />
        <FieldError error={errors.startDate} />
      </label>
      <label>
        Data sfârșit calculată
        <input type="datetime-local" value={endDate} readOnly />
        <span className="muted">
          Calculată automat în funcție de perioada planului.
        </span>
      </label>
    </>
  );
}
