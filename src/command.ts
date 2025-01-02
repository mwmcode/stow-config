import { Command } from '@cliffy/command';

export async function executeCommand() {
  const { options, cmd } = await new Command()
    .name('stow-config')
    .description(
      'Moves configuration for `--name` to `--destination` and creates a symlink for it in the original location (`--config-dir`).',
    )
    .example(
      'stow config for `~/.config/git`',
      'stow-config --name git --stow-dir $HOME/[your_stow_dotfiles]',
    )
    .option('-n, --name <string>', '.zshrc', {
      required: true,
    })
    .option('-d, --destination <string>', '$HOME/my_dotfiles', {
      required: true,
    })
    .option('-c, --config-dir <string>', '$HOME/.config', {
      default: `${Deno.env.get('HOME')}/.config`,
    })
    .parse(Deno.args);

  return { options, cmd };
}
