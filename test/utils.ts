import { join } from '@std/path';
import { CONFIGS, DEST_DIR, SRC_DIR } from '@/test/consts.ts';

async function cleanUpTestData() {
  await Deno.remove(SRC_DIR, { recursive: true });
  await Deno.remove(DEST_DIR, { recursive: true });
}

export async function prepareTestData() {
  try {
    await cleanUpTestData();
  } catch {
    // ignore
  }
  await Deno.mkdir(SRC_DIR, { recursive: true });
  await Deno.mkdir(DEST_DIR, { recursive: true });

  for (const config of CONFIGS) {
    const configPath = join(SRC_DIR, config);
    if (config.endsWith('/')) {
      await Deno.mkdir(configPath, { recursive: true });
      (await Deno.create(join(configPath, CONFIGS[0]))).close();

      continue;
    }
    (await Deno.create(configPath)).close();
  }
}
