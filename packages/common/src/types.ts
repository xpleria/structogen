/**
 * A normalized, fully‑resolved representation of a JSON Schema.
 * This is what generators receive — not raw JSON.
 */
export interface ParsedSchema {
  /** The original schema ID or filename */
  id: string;

  /** The root type name (e.g., "User", "Order", "Address") */
  rootTypeName: string;

  /** The resolved properties of the schema */
  properties: ParsedProperty[];

  /** Whether this schema represents an object, enum, array, etc. */
  kind: "object" | "enum" | "array" | "primitive";

  /** Optional: raw schema for debugging or advanced generators */
  raw?: unknown;
}

/**
 * A single property inside a ParsedSchema.
 */
export interface ParsedProperty {
  name: string;
  type: string; // normalized type name
  isRequired: boolean;
  isArray: boolean;
  description?: string;
}

/**
 * Output of a generator: one file to be written to disk.
 */
export interface GeneratedFile {
  /** Relative path inside the output folder */
  path: string;

  /** File contents */
  content: string;

  /** Optional: language-specific metadata */
  language?: string;

  /** Optional: generator name for debugging */
  generator?: string;
}
