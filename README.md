[![Publish](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml/badge.svg)](https://github.com/mwmcode/stow-config/actions/workflows/publish.yml)

# Stow Config

Like [GNU Stow](https://www.gnu.org/software/stow/)


- install it
```sh
deno install --global -R -W --allow-env=HOME --name stow jsr:@mcha/stow-config
```
> `-R`, `-W` to move config files and create symlinks for them;
> `--allow-env=HOME` to facilitate paths like `~/.config`
> `--name stow` you can name it something else, like `--name stow-configs`)


- run it
> make sure `$HOME/.deno/bin` is in `$PATH`:
```sh
stow
```

- TBC.
