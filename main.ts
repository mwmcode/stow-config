import { Command } from '@cliffy/command';
import { stowConfig } from '@/src/mod.ts';
import { logger } from '@/src/logger.ts';

if (!import.meta.main) {
  console.error('This script must be run in standalone mode.');
  Deno.exit(1);
}

const { options } = await new Command()
  .name('stow')
  .description('Run it without argument options to start')
  .option('-v, --version', 'Display version')
  .action(async options => {
    if (!options.version) return;
    const module = await import('./deno.json', { with: { type: 'json' } });
    console.log('jsr:@mcha/stow-config', logger.bold(module.default.version));
  })
  .parse(Deno.args);

if (Object.keys(options).length === 0) {
  stowConfig();
}
