import { snapshotTest } from '@cliffy/testing';
import { ansi } from '@cliffy/ansi';
import { runPrompt } from '@/src/runPrompt.ts';
import { DEST_DIR, SRC_DIR, TEST_DENO_ARGS } from './consts.ts';
import { prepareTestData } from './utils.ts';

await snapshotTest({
  name: 'Prompts user to enter paths for source and destination dirs',
  meta: import.meta,
  stdin: ansi
    .text(`${SRC_DIR}\n`)
    .text(`${DEST_DIR}\n`)
    .text(' ')
    .cursorDown(1)
    .text(' ')
    .cursorDown(1)
    .text(' \n')
    .toArray(),
  denoArgs: TEST_DENO_ARGS,
  async fn() {
    await prepareTestData();
    const result = await runPrompt();
    console.log({ result });
  },
});

// await snapshotTest({
//   name: 'Ask user to enter path to configs dir',
//   meta: import.meta,
//   stdin: ansi
//     .text(join(Deno.cwd(), TestDirectories.configSrcDir))
//     .text('\n')
//     .toArray(),
//   denoArgs: TEST_DENO_ARGS,
//   async fn() {
//     Deno.env.set(TESTSC_HOME_ALTERNATIVE, 'WRONG_DIR');
//     const answer = await enterConfigDir();
//     console.log({ answer });
//   },
// });

// await snapshotTest({
//   name: 'Ask user to enter path to target dir',
//   meta: import.meta,
//   stdin: ansi
//     .text(join(Deno.cwd(), TestDirectories.configDestDir))
//     .text('\n')
//     .toArray(),
//   denoArgs: ['-R', '--allow-env=SNAPSHOT_TEST_NAME'],
//   async fn() {
//     Deno.env.set(TESTSC_HOME_ALTERNATIVE, TESTSC_HOME_ALTERNATIVE);
//     const answer = await enterDestinationDir();
//     console.log({ answer });
//   },
// });
