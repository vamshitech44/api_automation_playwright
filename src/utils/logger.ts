export class Logger {
  static info(message: string, data?: unknown): void {
    console.log(`[INFO] ${message}`, data ?? '');
  }

  static error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error ?? '');
  }
}
