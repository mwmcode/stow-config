import { join } from '@std/path/join';
import { displayResults } from './displayResults.ts';
import { runPrompt } from './runPrompt.ts';

export async function stowConfig() {
  const { configDir, destDir, pickConfigs } = await runPrompt();

  for (const config of pickConfigs) {
    const sourcePath = join(configDir, config);
    const targetPath = join(destDir, config);
    // move config to target
    await Deno.rename(sourcePath, targetPath);
    // symlink it from target to configsDir
    await Deno.symlink(targetPath, sourcePath);
  }

  await displayResults({ names: pickConfigs, configsDir: configDir });
}
