import { httpClient } from "./httpClient";
import type {
  Subscription,
  SubscriptionInput,
} from "../../types/admin/subscriptions";

export async function getAll(): Promise<Subscription[]> {
  return httpClient.get<Subscription[]>("/api/subscriptions");
}

export async function getById(id: string): Promise<Subscription> {
  return httpClient.get<Subscription>(`/api/subscriptions/${id}`);
}

export async function create(
  input: SubscriptionInput,
): Promise<Subscription> {
  return httpClient.post<Subscription>(
    "/api/subscriptions",
    input,
  );
}

export async function update(
  id: string,
  input: SubscriptionInput,
): Promise<Subscription> {
  return httpClient.put<Subscription>(
    `/api/subscriptions/${id}`,
    input,
  );
}

export async function remove(
  id: string,
): Promise<{ message: string }> {
  return httpClient.delete<{ message: string }>(
    `/api/subscriptions/${id}`,
  );
}
