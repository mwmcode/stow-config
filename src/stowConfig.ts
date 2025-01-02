import { join } from '@std/path/join';
import type { CommandArgs } from '../types.ts';

export async function stowConfig({
  name,
  configDir,
  destination,
}: CommandArgs) {
  const currentConfigPath = join(configDir, name);
  const newConfigPath = join(destination, name);
  await Deno.rename(currentConfigPath, newConfigPath);
  await Deno.symlink(newConfigPath, currentConfigPath);
}
