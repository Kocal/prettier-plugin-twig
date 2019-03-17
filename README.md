# Prettier plugin for Twig

[![npm (scoped)](https://img.shields.io/npm/v/@kocal/prettier-plugin-twig.svg)](https://www.npmjs.com/package/@kocal/prettier-plugin-twig)
[![Build Status](https://travis-ci.com/Kocal/prettier-plugin-twig.svg?branch=master)](https://travis-ci.com/Kocal/prettier-plugin-twig)
[![Build status](https://ci.appveyor.com/api/projects/status/h2knu57tu1i0d3la/branch/master?svg=true)](https://ci.appveyor.com/project/Kocal/prettier-plugin-twig/branch/master)

## Install

yarn:
```bash
yarn add --dev prettier @kocal/prettier-plugin-twig
```

npm:
```bash
npm install --save-dev prettier @kocal/prettier-plugin-twig
```

## Use

You can add prettier as a script in your `package.json`,

```json
{
  "scripts": {
    "prettier": "prettier"
  }
}
```

**Note:** if you use Prettier 1.16 or a previous version, you have to manually specify the path to the plugin:
```json
{
  "scripts": {
    "prettier": "prettier --plugin=node_modules/@kocal/prettier-plugin-twig"
  }
}
```

and then run it via

```bash
yarn run prettier path/to/file.twig --write
# or
npm run prettier -- path/to/file.twig --write
```
