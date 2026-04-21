import * as XLSX from "xlsx";

/**
 * Exports an array of objects to an Excel file and triggers a download.
 * @param data Array of objects to export
 * @param fileName The base name of the exported file (without .xlsx)
 */
export function exportToExcel(data: any[], fileName: string) {
  if (!data || !data.length) {
     alert("لا توجد بيانات ليتم تصديرها.");
     return;
  }
  
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  // Convert JSON to worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Customizing columns widths (simple guess based on keys)
  const colWidths = Object.keys(data[0] || {}).map(() => ({ wch: 20 }));
  ws['!cols'] = colWidths;
  
  // Apply RTL direction to worksheet if supported by viewer
  if(!ws['!views']) ws['!views'] = [];
  ws['!views'].push({ rightToLeft: true });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
  // Trigger download
  XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
}

/**
 * Parses an Excel file and returns its content as an array of objects.
 * @param file The File object from an input element
 */
export function importFromExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
