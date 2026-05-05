import { saveFileInFormat } from './file-export';
import { importFileToInternalJson } from './file-import';
import type { Product } from '../types/product';
import type { ProductPayload } from '../services/products-service';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const escapeXml = (str: string): string =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * xmlNodeToObject returns `{ tag: "x" }` for a single tag and
 * `{ tag: ["x","y"] }` for multiple. Normalise both to string[].
 */
const normaliseTags = (raw: unknown): string[] => {
  if (!raw || typeof raw !== 'object') return [];
  const obj = raw as Record<string, unknown>;
  if (!obj.tag) return [];
  return Array.isArray(obj.tag)
    ? (obj.tag as unknown[]).map(String)
    : [String(obj.tag)];
};

const toPayload = (item: Record<string, unknown>): ProductPayload => ({
  name: String(item.name ?? ''),
  description: String(item.description ?? ''),
  imageUrl: String(item.imageUrl ?? ''),
  price: parseFloat(String(item.price ?? 0)) || 0,
  category: (item.category ?? 'accessories') as ProductPayload['category'],
  isFeatured: item.isFeatured === true || item.isFeatured === 'true',
  isNew: item.isNew === true || item.isNew === 'true',
  tags: Array.isArray(item.tags)
    ? (item.tags as unknown[]).map(String)
    : normaliseTags(item.tags),
  createdAt: new Date().toISOString(),
});

/* ─── Export ──────────────────────────────────────────────────────────────── */

export const exportProductsAsJson = async (products: Product[]): Promise<void> => {
  const data = products.map(({ id: _id, ...rest }) => rest);
  await saveFileInFormat('json', data, 'datos.json');
};

export const exportProductsAsCsv = async (products: Product[]): Promise<void> => {
  const headers = ['name', 'description', 'imageUrl', 'price', 'category', 'isFeatured', 'isNew', 'tags'];

  const escape = (val: string | number | boolean) => {
    const s = String(val);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const rows = products.map(p =>
    [
      escape(p.name),
      escape(p.description),
      escape(p.imageUrl),
      escape(p.price),
      escape(p.category),
      escape(p.isFeatured),
      escape(p.isNew),
      escape(p.tags.join('|')),
    ].join(',')
  );

  const csv = [headers.join(','), ...rows].join('\n');
  await saveFileInFormat('csv', csv, 'datos.csv');
};

export const exportProductsAsXml = async (products: Product[]): Promise<void> => {
  const items = products.map(p => `
  <product>
    <name>${escapeXml(p.name)}</name>
    <description>${escapeXml(p.description)}</description>
    <imageUrl>${escapeXml(p.imageUrl)}</imageUrl>
    <price>${p.price}</price>
    <category>${escapeXml(p.category)}</category>
    <isFeatured>${p.isFeatured}</isFeatured>
    <isNew>${p.isNew}</isNew>
    <tags>${p.tags.map(t => `<tag>${escapeXml(t)}</tag>`).join('')}</tags>
  </product>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<products>${items}\n</products>`;
  await saveFileInFormat('xml', xml, 'datos.xml');
};

/* ─── Import ──────────────────────────────────────────────────────────────── */

/**
 * Opens a native file picker, parses the selected file using the generic
 * import utility, then maps the result to ProductPayload[].
 */
export const importProducts = async (): Promise<ProductPayload[]> => {
  const { format, data } = await importFileToInternalJson();

  switch (format) {

    case 'json': {
      /* JSON: array of product objects */
      const arr = Array.isArray(data) ? data : [data];
      return (arr as Record<string, unknown>[]).map(toPayload);
    }

    case 'csv': {
      /* CSV: PapaParse returns Record<string, string>[] */
      const arr = Array.isArray(data) ? data : [data];
      return (arr as Record<string, unknown>[]).map(item => ({
        ...toPayload(item),
        /* Tags in CSV are pipe-separated strings */
        tags: typeof item.tags === 'string'
          ? item.tags.split('|').map((t: string) => t.trim()).filter(Boolean)
          : [],
      }));
    }

    case 'xml': {
      /*
       * xmlToJson returns { products: { product: {...} | [{...}] } }
       * Normalise product to always be an array.
       */
      const root = data as Record<string, unknown>;
      const products = root.products as Record<string, unknown> | undefined;
      if (!products) throw new Error('XML must have a <products> root element.');

      const raw = products.product;
      const arr: Record<string, unknown>[] = Array.isArray(raw)
        ? (raw as Record<string, unknown>[])
        : [raw as Record<string, unknown>];

      return arr.map(toPayload);
    }

    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
