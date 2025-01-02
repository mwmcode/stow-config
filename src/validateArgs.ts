import { join } from '@std/path/join';
import { ValidationError } from '@cliffy/command';
import type { CommandArgs } from '../types.ts';

export function validateArgs(args: CommandArgs) {
  const toolPath = join(args.configDir, args.name);

  if (Deno.lstatSync(toolPath).isSymlink) {
    throw new ValidationError(
      `${toolPath} is symlink! Please provide a path to a directory or a file`,
    );
  }
  if (!Deno.lstatSync(args.destination).isDirectory) {
    throw new ValidationError('-s/--stow-dir must be a valid directory');
  }
  return args;
}
