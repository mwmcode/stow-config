import { join } from '@std/path/join';
import { Table } from '@cliffy/table';
import { logger } from './logger.ts';

export async function displayResults({
  names,
  configsDir,
}: {
  names: string[];
  configsDir: string;
}) {
  const results: string[][] = [];
  for (const name of names) {
    const symlink = join(configsDir, name);
    const target = await Deno.readLink(symlink);
    results.push([logger.italic(`🔗 ${symlink}`), '@->', logger.bold(target)]);
  }
  console.log('\n✅ done!\n');
  Table.from(results).render();
}
