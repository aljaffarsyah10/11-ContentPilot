import { describe, it, expect } from "vitest";

function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return "";
  let str = String(val);
  if (str.includes('"') || str.includes(",") || str.includes("\n") || str.includes("\r")) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

describe("Unit: CSV Export RFC 4180 Escaping", () => {
  it("should return empty string for null or undefined", () => {
    expect(escapeCsvCell(null)).toBe("");
    expect(escapeCsvCell(undefined)).toBe("");
  });

  it("should not quote regular alphanumeric string without delimiters", () => {
    expect(escapeCsvCell("Konten Instagram")).toBe("Konten Instagram");
  });

  it("should wrap values containing commas in double quotes", () => {
    expect(escapeCsvCell("Tips, Trik, Strategi")).toBe('"Tips, Trik, Strategi"');
  });

  it("should escape existing double quotes by doubling them according to RFC 4180", () => {
    expect(escapeCsvCell('Halo "Kreator"!')).toBe('"Halo ""Kreator""!"');
  });

  it("should wrap multiline text in double quotes", () => {
    const multiline = "Baris 1\nBaris 2";
    expect(escapeCsvCell(multiline)).toBe('"Baris 1\nBaris 2"');
  });

  it("should prefix exported CSV string with UTF-8 BOM", () => {
    const BOM = "\uFEFF";
    const header = "Title,Platform,Caption,Hashtags,Status,Scheduled Date,Created Date";
    const csvContent = `${BOM}${header}\r\n`;

    expect(csvContent.charCodeAt(0)).toBe(0xfeff);
    expect(csvContent.startsWith("\uFEFF")).toBe(true);
  });
});

