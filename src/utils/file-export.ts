import { showSaveFilePicker } from 'show-open-file-picker';

/**
 * Opens a native OS "Save As" dialog and writes the given content to disk.
 *
 * @param format   - 'json' | 'csv' | 'xml'
 * @param data     - JSON: pass a plain object/array; CSV/XML: pass a pre-built string
 * @param fileName - Suggested file name shown in the dialog
 */
export const saveFileInFormat = async (
  format: 'json' | 'csv' | 'xml',
  data: object | string,
  fileName = 'datos.json'
): Promise<void> => {
  let description = '';
  let acceptedType: Record<string, string[]> = {};
  let content = '';

  switch (format) {
    case 'json':
      description = 'JSON';
      acceptedType = { 'application/json': ['.json'] };
      content = JSON.stringify(data, null, 2);
      break;
    case 'xml':
      description = 'XML';
      acceptedType = { 'application/xml': ['.xml'], 'text/xml': ['.xml'] };
      content = data as string;
      break;
    case 'csv':
      description = 'CSV';
      acceptedType = { 'text/csv': ['.csv'] };
      content = data as string;
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  const handle = await showSaveFilePicker({
    suggestedName: fileName,
    types: [{ description, accept: acceptedType }],
  });

  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
};
