[![Publish](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml/badge.svg)](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml)

# Stow Config

![demo](./screenshots/stow_demo.gif 'demo').

1. moves selected config files/directories (aka _dotfiles_) from `📂 source/` to `📂 target/`
2. creates 🔗 symlinks for them 👆 instead (example: `📂 source/.zshrc @-> 📂 target/.zshrc`)
3. now you can track those _dotfiles_ in `📂 target/` using `git`

Inspired by [GNU Stow](https://www.gnu.org/software/stow/)

### Installation

```sh
deno install --global \
    --allow-read --allow-write \
    --allow-env=HOME \
    --name stow \
    jsr:@mcha/stow-config
```

- `--allow-read --allow-write` to move configuration files and create symlinks for them.
- `--allow-env=HOME` to allow for paths that start with `~`, such as `~/.config`.
- `--name stow` can be set to something else, like `--name stow-configs`.

### Usage

> make sure `$HOME/.deno/bin` is in `$PATH`:

```sh
stow
```

![stow command prompts](./screenshots/stow_pick_configs.png 'stow command prompts').
![stow command prompts](./screenshots/stow_command.png 'stow command prompts').
![config dir contains symlinks instead of acutaly files/dirs](./screenshots/result_config_dir.png 'config dir result').

### Uninstall

```sh
deno uninstall --global stow
```

_assuming it was installed with `--name stow`_
