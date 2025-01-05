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

  for (const configPath of CONFIGS) {
    if (configPath.includes('/')) {
      await Deno.mkdir(join(SRC_DIR, configPath.split('/')[0]), {
        recursive: true,
      });
    }
    // create file
    (await Deno.create(join(SRC_DIR, configPath))).close();
  }
}
