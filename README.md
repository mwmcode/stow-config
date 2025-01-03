# Stow Config

Like [GNU Stow](https://www.gnu.org/software/stow/)

### Usage

- install globally (`--global`)

```sh
deno install --global --allow-env=HOME -R -W --name stow-config jsr:@mcha/stow-config@latest
```

> `-R`, `-W` to read/write config files; `--allow-env=HOME` to read
> `$HOME/.config`

- make sure `$HOME/.deno/bin` is added to `$PATH`. In `bash` & `zsh`:

```sh
export PATH="/Users/mch/.deno/bin:$PATH"
# restart shell/terminal
```
- run command
```sh
stow-config
```

- TBC.