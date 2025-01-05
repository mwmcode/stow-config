[![Publish](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml/badge.svg)](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml)

# Stow Config
<video controls width="600">
  <source src="screenshots/stow_demo.mov" type="video/mov">
</video>


### About
1. moves selected config files/directories (aka _dotfiles_) from `📂 source/` to `📂 target/`
2. creates 🔗 symlinks for them 👆 instead (example: `📂 source/.zshrc @-> 📂 target/.zshrc`)
3. now you can track those _dotfiles_ in `📂 target/` using `git`


Inspired by [GNU Stow](https://www.gnu.org/software/stow/)

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
