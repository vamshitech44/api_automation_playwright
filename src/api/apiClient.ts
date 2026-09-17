import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(
    path: string,
    params?: Record<string, string | number>
  ): Promise<APIResponse> {
    return this.request.get(path, { params });
  }

  async post(path: string, data: unknown): Promise<APIResponse> {
    return this.request.post(path, { data });
  }

  async put(path: string, data: unknown): Promise<APIResponse> {
    return this.request.put(path, { data });
  }

  async patch(path: string, data: unknown): Promise<APIResponse> {
    return this.request.patch(path, { data });
  }

  async delete(path: string): Promise<APIResponse> {
    return this.request.delete(path);
  }

  async assertStatus(
    response: APIResponse,
    expectedStatus: number
  ): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  async json<T>(response: APIResponse): Promise<T> {
    return response.json() as Promise<T>;
  }
}