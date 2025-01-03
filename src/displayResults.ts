import { join } from '@std/path/join';

export async function displayResults({
  names,
  configsDir,
}: {
  names: string[];
  configsDir: string;
}) {
  const results = [];
  for (const name of names) {
    const symlink = join(configsDir, name);
    const target = await Deno.readLink(symlink);
    results.push(`${symlink} @-> ${target}`);
  }
  console.log('\n✅ done!\n');
  console.table(results);
}
