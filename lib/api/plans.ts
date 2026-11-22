import { httpClient } from "./httpClient";
import type { Plan, PlanInput } from "../../types/admin/plans";

export async function getAll(): Promise<Plan[]> {
  return httpClient.get<Plan[]>("/api/plans");
}

export async function getById(id: string): Promise<Plan> {
  return httpClient.get<Plan>(`/api/plans/${id}`);
}

export async function create(input: PlanInput): Promise<Plan> {
  return httpClient.post<Plan>("/api/plans", input);
}

export async function update(
  id: string,
  input: PlanInput,
): Promise<Plan> {
  return httpClient.put<Plan>(`/api/plans/${id}`, input);
}

export async function remove(id: string): Promise<{ message: string }> {
  return httpClient.delete<{ message: string }>(`/api/plans/${id}`);
}
