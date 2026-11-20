export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: unknown,
    public readonly values?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

function getUrl(path: string): string {
  if (!apiBaseUrl) return path;
  return `${apiBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function request<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown,
): Promise<T> {
  const response = await fetch(getUrl(path), {
    method,
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = response.status === 204
    ? undefined
    : await response.json().catch(() => undefined);

  if (!response.ok) {
    const data =
      payload && typeof payload === "object"
        ? (payload as { error?: string; errors?: unknown; values?: unknown })
        : {};
    throw new ApiError(
      response.status,
      data.error ?? "A apărut o eroare la procesarea cererii.",
      data.errors,
      data.values,
    );
  }

  return payload as T;
}

export const httpClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path, "GET");
  },

  post<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, "POST", body);
  },

  put<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, "PUT", body);
  },

  delete<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, "DELETE", body);
  },
};
