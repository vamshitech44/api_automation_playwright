// AI-generated test — follows the analyzed framework (GIT_Framework, TYPESCRIPT/PLAYWRIGHT).
// Source: Zephyr SCRMGOAPP-T2076
import { test, expect } from '@playwright/test';

const BASE = process.env.API_BASE_URL || process.env.BASE_URL || 'https://wms-app-production-4a97.up.railway.app';
const USERNAME = process.env.API_USERNAME || 'superadmin';
const PASSWORD = process.env.API_PASSWORD || 'super123';

test.describe('Clients API', () => {
  test('GET /api/clients positive contract test', async ({ request }) => {
    // Step 1: Get the JWT token from https://wms-app-production-4a97.up.railway.app/api/auth/login { "username" : "superadmin" , "password" : "super123" }
    // Step 2: GET https://wms-app-production-4a97.up.railway.app/api/clients Bearer Token : eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0I
    // Authenticate: obtain a bearer token from the login endpoint.
    const _login = await request.post(`${BASE}/api/auth/login`, {
      data: { username: USERNAME, password: PASSWORD },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(_login.ok(), 'login request should succeed').toBeTruthy();
    const _token = (await _login.json()).token as string;
    expect(_token, 'login should return a token').toBeTruthy();
    const _res = await request.get(`${BASE}/api/clients`, {
      headers: { Authorization: `Bearer ${_token}` },
    });
    expect(_res.status()).toBe(200);
  });
});
