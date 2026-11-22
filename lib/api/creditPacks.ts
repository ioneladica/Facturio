import { httpClient } from "./httpClient";
import type {
  CreditPack,
  CreditPackInput,
} from "../../types/admin/creditPacks";

export async function getAll(): Promise<CreditPack[]> {
  return httpClient.get<CreditPack[]>("/api/credit-packs");
}

export async function getById(id: string): Promise<CreditPack> {
  return httpClient.get<CreditPack>(`/api/credit-packs/${id}`);
}

export async function create(
  input: CreditPackInput,
): Promise<CreditPack> {
  return httpClient.post<CreditPack>("/api/credit-packs", input);
}

export async function update(
  id: string,
  input: CreditPackInput,
): Promise<CreditPack> {
  return httpClient.put<CreditPack>(`/api/credit-packs/${id}`, input);
}

export async function remove(
  id: string,
): Promise<{ message: string }> {
  return httpClient.delete<{ message: string }>(
    `/api/credit-packs/${id}`,
  );
}
