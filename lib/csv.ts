// Public-submitted text: quote every cell, neutralise spreadsheet formulas (=, +, -, @).
function toCsvCell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function downloadCsv(name: string, rows: string[][]) {
  const csv = rows.map((r) => r.map(toCsvCell).join(",")).join("\r\n");
  // BOM so Excel reads Marathi/Unicode correctly
  const url = URL.createObjectURL(
    new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
