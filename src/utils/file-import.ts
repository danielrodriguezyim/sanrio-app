import { showOpenFilePicker } from 'show-open-file-picker';
import Papa from 'papaparse';

/* ─── XML → JSON (generic recursive) ─────────────────────────────────────── */

function xmlNodeToObject(node: Element): unknown {
  const children = Array.from(node.children);

  if (children.length === 0) {
    return node.textContent?.trim() ?? '';
  }

  const result: Record<string, unknown> = {};

  for (const child of children) {
    const value = xmlNodeToObject(child);
    const key = child.nodeName;

    if (result[key] !== undefined) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      (result[key] as unknown[]).push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

function xmlToJson(text: string): Record<string, unknown> {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'application/xml');
  const errorNode = xmlDoc.querySelector('parsererror');

  if (errorNode) throw new Error('Invalid XML file.');

  const root = xmlDoc.documentElement;
  return { [root.nodeName]: xmlNodeToObject(root) };
}

/* ─── CSV → JSON (PapaParse) ──────────────────────────────────────────────── */

function csvToJson(text: string): unknown[] {
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length) throw new Error('Invalid CSV file.');
  return result.data;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

function parseFileContent(extension: string, text: string): unknown {
  switch (extension) {
    case 'json': return JSON.parse(text);
    case 'xml': return xmlToJson(text);
    case 'csv': return csvToJson(text);
    default: throw new Error(`Unsupported format: ${extension}`);
  }
}

/* ─── Public API ──────────────────────────────────────────────────────────── */

export interface ImportResult {
  fileName: string;
  format: string;
  data: unknown;
}

/**
 * Opens a native OS file picker restricted to .json, .csv, and .xml.
 * Returns the parsed file content as a generic JSON structure.
 */
export async function importFileToInternalJson(): Promise<ImportResult> {
  const [fileHandle] = await showOpenFilePicker({
    multiple: false,
    types: [
      {
        description: 'Compatible files',
        accept: {
          'application/json': ['.json'],
          'application/xml': ['.xml'],
          'text/xml': ['.xml'],
          'text/csv': ['.csv'],
        },
      },
    ],
  });

  const file = await fileHandle.getFile();
  const text = await file.text();
  const extension = getExtension(file.name);
  const data = parseFileContent(extension, text);

  return { fileName: file.name, format: extension, data };
}
