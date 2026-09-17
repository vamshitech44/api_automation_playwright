# Hybrid API Automation Framework — Playwright + TypeScript + XLSX

Industry-style starter framework for API automation using Playwright APIRequestContext,
TypeScript, and Excel-driven data.

## Prerequisites
- Node.js 20+
- npm 10+

## Install
```bash
npm install
npx playwright install
```

## Run
```bash
npm test
npm run test:smoke
npm run test:headed
npm run report
```

The sample tests use `https://jsonplaceholder.typicode.com` so the project can run
without application-specific credentials.

## Data-driven design
Excel test data is stored in `test-data/api-test-data.xlsx`.
The workbook contains a `GET_USERS` sheet with columns:
`testCaseId, testCaseName, userId, expectedStatus, expectedNameContains`.

To replace the sample API:
1. Change `baseURL` in `playwright.config.ts` or environment variables.
2. Add/update endpoint classes under `src/api`.
3. Add request/response models under `src/models`.
4. Add Excel sheets and map them through `src/utils/excelReader.ts`.
5. Add tests under `tests`.

## Environment variables
Optional:
- `API_BASE_URL`
- `API_TOKEN`

Example PowerShell:
```powershell
$env:API_BASE_URL="https://your-api.example.com"
$env:API_TOKEN="your-token"
npm test
```

## Reports
Playwright HTML report is generated under `playwright-report/`.
Test artifacts are stored under `test-results/`.

## Architecture
- `src/api`: endpoint/client layer
- `src/models`: typed request/response contracts
- `src/utils`: reusable utilities such as Excel reader
- `src/config`: runtime configuration
- `tests`: business-facing API tests
- `test-data`: Excel test data
- `scripts`: data/config helpers
