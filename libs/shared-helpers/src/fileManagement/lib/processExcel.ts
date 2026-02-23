import * as XLSX from 'xlsx';

// Converts the Excel file to JSON data
// file: the name of the file reference to open
// worksheetIndex: the zero based index of the worksheet to open
export async function processExcel<T = string[]>(file: File, worksheetIndex: number): Promise<T[]> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const firstSheetName = workbook.SheetNames[worksheetIndex];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return jsonData as T[];
}
