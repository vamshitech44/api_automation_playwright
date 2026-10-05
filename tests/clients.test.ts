// AI-generated test — follows the analyzed framework (GIT_Framework, TYPESCRIPT/PLAYWRIGHT).
// Source: Zephyr SCRMGOAPP-T2076
import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';

const BASE = process.env.API_BASE_URL || process.env.BASE_URL || 'https://wms-app-production-4a97.up.railway.app';
const USERNAME = process.env.API_USERNAME || 'superadmin';
const PASSWORD = process.env.API_PASSWORD || 'super123';
const STEP_TRACE: any[] = [];
const STEP_TRACE_FILE = process.env.STEP_TRACE_FILE || 'code-executor-steps.json';
async function _rec(step: number, action: string, method: string, endpoint: string, req: any, res: any, expected: any) {
  let body: any = undefined; let code: number | undefined = undefined;
  try { code = res ? res.status() : undefined; } catch {}
  try { body = res ? await res.json() : undefined; } catch { try { body = res ? await res.text() : undefined; } catch {} }
  const ok = expected == null ? (code != null && code < 400) : (code === expected);
  STEP_TRACE.push({ step, action, method, endpoint, request: req || {}, response: { status_code: code, body }, expected: { status_code: expected }, status: ok ? 'PASSED' : 'FAILED' });
}
test.afterAll(async () => {
  try { fs.writeFileSync(STEP_TRACE_FILE, JSON.stringify(STEP_TRACE, null, 2)); } catch {}
});

test.describe('Clients API', () => {
  test('GET /api/clients positive contract test', async ({ request }) => {
    // Step 1: Get the JWT token from https://wms-app-production-4a97.up.railway.app/api/auth/login { "username" : "superadmin" , "password" : "super123" }
    // Step 2: GET https://wms-app-production-4a97.up.railway.app/api/clients Bearer Token : eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0I
    // Step 1 — authenticate: obtain a bearer token from the login endpoint.
    const _loginReq = { username: USERNAME, password: '***' };
    const _login = await request.post(`${BASE}/api/auth/login`, {
      data: { username: USERNAME, password: PASSWORD },
      headers: { 'Content-Type': 'application/json' },
    });
    await _rec(1, 'POST /api/auth/login (authenticate)', 'POST', `${BASE}/api/auth/login`, _loginReq, _login, 200);
    expect(_login.ok(), 'login request should succeed').toBeTruthy();
    const _token = (await _login.json()).token as string;
    expect(_token, 'login should return a token').toBeTruthy();
    const _res = await request.get(`${BASE}/api/clients`, {
      headers: { Authorization: `Bearer ${_token}` },
    });
    await _rec(2, 'GET /api/clients', 'GET', `${BASE}/api/clients`, { headers: { Authorization: 'Bearer ***' } }, _res, 200);
    expect(_res.status()).toBe(200);
  });
});

// AI-API-Automation re-run marker: wf=870071e8-9a0c-4200-bc4c-52942b7576ab branch=ai-gen/SCRMGOAPP-T2076/20261005-200246Z ts=20261005T200255Z (test logic unchanged — stamped so a PR can be opened for re-approval)
