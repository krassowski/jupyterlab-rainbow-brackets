# jupyterlab-rainbow-brackets

[![Github Actions Status](https://github.com/krassowski/jupyterlab-rainbow-brackets/workflows/Build/badge.svg)](https://github.com/krassowski/jupyterlab-rainbow-brackets/actions/workflows/build.yml)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/krassowski/jupyterlab-rainbow-brackets/main?urlpath=lab)
[![PyPI version](https://img.shields.io/pypi/v/jupyterlab-rainbow-brackets.svg)](https://pypi.org/project/jupyterlab-rainbow-brackets/)

A JupyterLab/Jupyter Notebook 7+ extension adding rainbow brackets/parentheses to the editor, based on [rainbowbrackets](https://github.com/eriknewland/rainbowbrackets).

Provides seven colours of brackets, with two sets of colors tuned for light and dark themes:

| In Light Mode                            | In Dark Mode                           |
| ---------------------------------------- | -------------------------------------- |
| ![rainbow brackets in light mode][light] | ![rainbow brackets in dark mode][dark] |

The colors are fully customizable in the settings:

<p align="center">
  <img width="460"  src="https://raw.githubusercontent.com/krassowski/jupyterlab-rainbow-brackets/main/docs/images/settings.png" alt="rainbow brackets settings">
</p>

[light]: https://raw.githubusercontent.com/krassowski/jupyterlab-rainbow-brackets/main/docs/images/light.png
[dark]: https://raw.githubusercontent.com/krassowski/jupyterlab-rainbow-brackets/main/docs/images/dark.png
[settings]: https://raw.githubusercontent.com/krassowski/jupyterlab-rainbow-brackets/main/docs/images/settings.png

## Requirements

- JupyterLab >= 4.0.0 or Jupyter Notebook >= 7.0.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab-rainbow-brackets
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab-rainbow-brackets
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_rainbow_brackets directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab-rainbow-brackets
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-rainbow-brackets` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
