import { APIResponse } from '@playwright/test';
import { ApiClient } from './apiClient';

export class UsersApi {
  constructor(private readonly client: ApiClient) {}

  getUser(userId: number): Promise<APIResponse> {
    return this.client.get(`/users/${userId}`);
  }

  getUsers(): Promise<APIResponse> {
    return this.client.get('/users');
  }
}
