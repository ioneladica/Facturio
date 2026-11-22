import { httpClient } from "./httpClient";
import type { User, UserInput } from "../../types/admin/users";

export async function getAll(): Promise<User[]> {
  return httpClient.get<User[]>("/api/users");
}

export async function getById(id: string): Promise<User> {
  return httpClient.get<User>(`/api/users/${id}`);
}

export async function create(input: UserInput): Promise<User> {
  return httpClient.post<User>("/api/users", input);
}

export async function update(
  id: string,
  input: UserInput,
): Promise<User> {
  return httpClient.put<User>(`/api/users/${id}`, input);
}

export async function remove(id: string): Promise<{ message: string }> {
  return httpClient.delete<{ message: string }>(`/api/users/${id}`);
}
