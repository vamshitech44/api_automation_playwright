import { test, expect } from '@playwright/test';
import { ApiClient } from '../src/api/apiClient';
import { UsersApi } from '../src/api/usersApi';
import { User } from '../src/models/user';

test('GET /users returns a non-empty collection @smoke', async ({ request }) => {
  const api = new UsersApi(new ApiClient(request));

  const response = await api.getUsers();

  expect(response.status()).toBe(200);

  const users = await response.json() as User[];

  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);

  expect(users[0]).toHaveProperty('id');
  expect(users[0]).toHaveProperty('email');
});