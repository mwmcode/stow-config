export const TestDirectories = {
  configSrcDir: 'test/data/config-src',
  configDestDir: 'test/data/config-dest',
};

export const TESTSC_HOME_ALTERNATIVE = 'TESTSC_CONFIG';

export const TEST_DENO_ARGS = [
  '-R',
  `--allow-env=SNAPSHOT_TEST_NAME,${TESTSC_HOME_ALTERNATIVE}`,
];
