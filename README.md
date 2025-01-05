[![Publish](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml/badge.svg)](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml)

# Stow Config

Like [GNU Stow](https://www.gnu.org/software/stow/)

### Installation
```sh
deno install --global --allow-read --allow-write --allow-env=HOME --name stow jsr:@mcha/stow-config
```
- `--allow-read --allow-write` are used to move configuration files and create symlinks for them.
- `--allow-env=HOME` is used to allow for paths that start with `~`, such as `~/.config`.
- `--name stow` can be set to something else, like `--name stow-configs`.

### Usage
> make sure `$HOME/.deno/bin` is in `$PATH`:
```sh
stow
```
![stow command prompts](./screenshots/stow_command.png 'stow command prompts').

![config dir contains symlinks instead of acutaly files/dirs](./screenshots/result_config_dir.png 'config dir result').


### Uninstall
```sh
deno uninstall --global stow
```
_assuming it was installed with `--name stow`_