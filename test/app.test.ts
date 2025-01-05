import { snapshotTest } from '@cliffy/testing';
import { ansi } from '@cliffy/ansi';
import { runPrompt } from '@/src/runPrompt.ts';
import { DEST_DIR, SRC_DIR, TEST_DENO_ARGS } from './consts.ts';
import { prepareTestData } from './utils.ts';
import { stowConfig } from '@/src/mod.ts';
import { assert, assertExists } from 'jsr:@std/assert';
import { join } from '@std/path';
import { CONFIGS } from '@/test/consts.ts';

const stdInputs = ansi
  .text(`${SRC_DIR}\n`)
  .text(`${DEST_DIR}\n`)
  .text(' ')
  .cursorDown(1)
  .text(' ')
  .cursorDown(1)
  .text(' ')
  .cursorDown(1)
  .text(' \n')
  .toArray();

await snapshotTest({
  name: 'Prompts user to enter paths for source and destination dirs',
  meta: import.meta,
  stdin: stdInputs,
  denoArgs: TEST_DENO_ARGS,
  async fn() {
    await prepareTestData();
    const result = await runPrompt();
    console.log(result);
  },
});

await snapshotTest({
  name: 'Moves config files from src to dest, and creates symlinks',
  meta: import.meta,
  stdin: stdInputs,
  denoArgs: TEST_DENO_ARGS,
  async fn() {
    await prepareTestData();
    const result = await stowConfig();
    console.log(result);
    for (const config of CONFIGS) {
      if (config.includes('/')) {
        const dir = config.split('/')[0];
        assert((await Deno.lstat(join(DEST_DIR, dir))).isDirectory);
        assertExists(await Deno.readLink(join(SRC_DIR, dir)));
        continue;
      }
      assertExists(await Deno.readLink(join(SRC_DIR, config)));
    }
  },
});
