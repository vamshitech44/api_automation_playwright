import * as XLSX from 'xlsx';

export type ExcelRow = Record<string, string | number | boolean>;

export class ExcelReader {
  static read<T extends ExcelRow>(filePath: string, sheetName: string): T[] {
    const workbook = XLSX.readFile(filePath, { cellDates: true });
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error(`Excel sheet '${sheetName}' not found in ${filePath}`);
    }

    return XLSX.utils.sheet_to_json<T>(sheet, { defval: '' });
  }
}
