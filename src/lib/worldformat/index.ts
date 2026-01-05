type AnyObj = Record<string, any>;

function parseValue(raw: string): string | number | boolean {
  // string
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1);
  }

  // boolean
  if (raw === "true") return true;
  if (raw === "false") return false;

  // number
  return Number(raw);
}

export function parse(text: string) {
  const root: AnyObj = {};

  const lines = text.split(/\r?\n/);

  let currentPath: string[] | null = null;
  let currentNode: AnyObj | null = null;

  for (const rawLine of lines) {
    const line = stripComment(rawLine);
    if (!line) continue;

    // Node declaration
    if (line.startsWith("[") && line.endsWith("]")) {
      const path = line.slice(1, -1).split("/");

      let cursor: AnyObj = root;

      for (let i = 0; i < path.length; i++) {
        const key = path[i];
        const isLeaf = i === path.length - 1;

        if (isLeaf) {
          if (!(key in cursor)) {
            cursor[key] = {};
            currentNode = cursor[key];
          } else if (Array.isArray(cursor[key])) {
            const obj: AnyObj = {};
            cursor[key].push(obj);
            currentNode = obj;
          } else {
            const first = cursor[key];
            const obj: AnyObj = {};
            cursor[key] = [first, obj];
            currentNode = obj;
          }
        } else {
          cursor[key] ??= {};
          cursor = cursor[key];
        }
      }

      currentPath = path;
      continue;
    }

    // Attribute
    if (currentNode) {
      const idx = line.indexOf("=");
      if (idx === -1) continue;

      const key = line.slice(0, idx).trim();
      const rawValue = line.slice(idx + 1).trim();

      currentNode[key] = parseValue(rawValue);
    }
  }

  return root;
}

function stripComment(line: string): string {
  let inString = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (ch === "#" && !inString) {
      return line.slice(0, i).trim();
    }
  }

  return line.trim();
}