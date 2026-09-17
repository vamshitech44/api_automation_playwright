import { test, expect } from '@playwright/test';
import path from 'node:path';
import { ApiClient } from '../src/api/apiClient';
import { UsersApi } from '../src/api/usersApi';
import { ExcelReader } from '../src/utils/excelReader';
import { User } from '../src/models/user';

type UserTestData = {
  testCaseId: string;
  testCaseName: string;
  userId: number;
  expectedStatus: number;
  expectedNameContains: string;
};

const dataFile = path.resolve(process.cwd(), 'test-data/api-test-data.xlsx');
const testData = ExcelReader.read<UserTestData>(dataFile, 'GET_USERS');

for (const data of testData) {
  test(`${data.testCaseId} - ${data.testCaseName} @smoke`, async ({ request }) => {
    const client = new ApiClient(request);
    const usersApi = new UsersApi(client);

    const response = await usersApi.getUser(Number(data.userId));
    await client.assertStatus(response, Number(data.expectedStatus));

    const body = await client.json<User>(response);

    expect(body.id).toBe(Number(data.userId));
    expect(body.name).toContain(String(data.expectedNameContains));
    expect(response.headers()['content-type']).toContain('application/json');
  });
}
