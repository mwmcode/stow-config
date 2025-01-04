import { TESTSC_HOME_ALTERNATIVE } from '@/consts.ts';

export function checkDefaultConfigsDir() {
  try {
    const testHomeDir = Deno.env.get(TESTSC_HOME_ALTERNATIVE);
    console.log({ testHomeDir });
    if (typeof testHomeDir === 'string') {
      return Deno.lstatSync(testHomeDir).isDirectory ? testHomeDir : null;
    } else if (!testHomeDir) {
      // only .get('HOME') when not running tests
      const homeDir = Deno.env.get('HOME');
      console.log({ homeDir });
      return Deno.lstatSync(`${homeDir}/.config`).isDirectory
        ? `${homeDir}/.config`
        : null;
    }
    return null;
  } catch {
    return null;
  }
}
