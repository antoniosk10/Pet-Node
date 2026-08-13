import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

export function findEnv(startDir = process.cwd()): string | undefined {
  let dir = startDir;
  while (true) {
    const candidate = join(dir, '.env');
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return undefined; // дошли до корня FS
    dir = parent;
  }
}
