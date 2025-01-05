import { join } from '@std/path';

export const TEST_DENO_ARGS = ['-R', '-W', '--allow-env=SNAPSHOT_TEST_NAME'];

export const SRC_DIR = join(Deno.cwd(), 'test/data/config-src');

export const DEST_DIR = join(Deno.cwd(), 'test/data/config-dest');

export const CONFIGS = ['.prettierrc.js', 'git/config', '.zshrc', 'starship.toml'];
