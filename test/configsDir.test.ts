import { snapshotTest } from '@cliffy/testing';
import { ansi } from '@cliffy/ansi';
import { promptConfigDir } from '../src/prompts/index.ts';
import { join } from '@std/path';
import {
  TESTSC_HOME_ALTERNATIVE,
  TEST_DENO_ARGS,
  TestDirectories,
} from '@/consts.ts';
import { promptDestinationDir } from '@/src/prompts/destinationDir.ts';

await snapshotTest({
  name: 'Prompt user to use default `$HOME/.config`',
  meta: import.meta,
  stdin: ansi.cursorForward.text('\n').toArray(),
  denoArgs: TEST_DENO_ARGS,
  async fn() {
    Deno.env.set(TESTSC_HOME_ALTERNATIVE, join(Deno.cwd(), 'test/data'));
    const answer = await promptConfigDir();
    console.log({ answer });
    Deno.env.delete(TESTSC_HOME_ALTERNATIVE);
  },
});

await snapshotTest({
  name: 'Ask user to enter path to configs dir',
  meta: import.meta,
  stdin: ansi
    .text(join(Deno.cwd(), TestDirectories.configSrcDir))
    .text('\n')
    .toArray(),
  denoArgs: TEST_DENO_ARGS,
  async fn() {
    Deno.env.set(TESTSC_HOME_ALTERNATIVE, 'WRONG_DIR');
    const answer = await promptConfigDir();
    console.log({ answer });
  },
});

await snapshotTest({
  name: 'Ask user to enter path to target dir',
  meta: import.meta,
  stdin: ansi
    .text(join(Deno.cwd(), TestDirectories.configDestDir))
    .text('\n')
    .toArray(),
  denoArgs: ['-R', '--allow-env=SNAPSHOT_TEST_NAME'],
  async fn() {
    Deno.env.set(TESTSC_HOME_ALTERNATIVE, TESTSC_HOME_ALTERNATIVE);
    const answer = await promptDestinationDir();
    console.log({ answer });
  },
});
