# Prettier plugin for Twig

[![npm (scoped)](https://img.shields.io/npm/v/@kocal/prettier-plugin-twig.svg)](https://www.npmjs.com/package/@kocal/prettier-plugin-twig)
[![Build Status](https://travis-ci.com/Kocal/prettier-plugin-twig.svg?branch=master)](https://travis-ci.com/Kocal/prettier-plugin-twig)
[![Build status](https://ci.appveyor.com/api/projects/status/h2knu57tu1i0d3la/branch/master?svg=true)](https://ci.appveyor.com/project/Kocal/prettier-plugin-twig/branch/master)

## WORK IN PROGRESS

The plugin is still under development, nothing will work if you try to install it now! :)

### Roadmap

| Type                         | Example                                                                       | Implemented |
| ---------------------------- | ----------------------------------------------------------------------------- | ----------- |
| `AUTO_ESCAPE`                | `{% autoescape 'html' %}Foo{% endautoescape %}`                               | :x: |
| `BLOCK`                      | `{% block title%}The title{% endblock %}`                                     | :x: |
| `DEPRECATED`                 | `{% deprecated 'The "base.twig" template is deprecated' %}`                   | :x: |
| `DO`                         | `{% do 1 + 2 %}`                                                              | :x: |
| `EXPRESSION_ARRAY`           | `[1, 'foo', 3]`, `{ a: 'a': b: 'b' }`                                         | :heavy_check_mark: |
| `EXPRESSION_ASSIGN_NAME`     | ...                                                                           | :x: |
| `EXPRESSION_BINARY`          | ...                                                                           | :x: |
| `EXPRESSION_BINARY_RANGE`    | ...                                                                           | :x: |
| `EXPRESSION_BLOCK_REFERENCE` | ...                                                                           | :x: |
| `EXPRESSION_CONDITIONAL`     | ...                                                                           | :x: |
| `EXPRESSION_CONSTANT`        | `"foo"`, `123`                                                                | :heavy_check_mark: |
| `EXPRESSION_FILTER`          | ...                                                                           | :x: |
| `EXPRESSION_FUNCTION`        | ...                                                                           | :x: |
| `EXPRESSION_GET_ATTR`        | Accessing an attribute, e.g.: `foo.bar`, `foo[bar]`, `foo.getBar()`           | :heavy_check_mark: |
| `EXPRESSION_METHOD_CALL`     | ...                                                                           | :x: |
| `EXPRESSION_NAME`            | Usage of a variable                                                           | :heavy_check_mark: |
| `EXPRESSION_NULL_COALESCE`   | ...                                                                           | :x: |
| `EXPRESSION_PARENT`          | ...                                                                           | :x: |
| `EXPRESSION_TEST`            | ...                                                                           | :x: |
| `EXPRESSION_UNARY`           | ...                                                                           | :x: |
| `EXPRESSION_UNARY_NEG`       | ...                                                                           | :x: |
| `EXPRESSION_UNARY_POS`       | ...                                                                           | :x: |
| `FLUSH`                      | `{% flush %}`                                                                 | :x: |
| `FOR`                        | `{% for i in 0..10 %} ... {% endfor %}`                                       | :x: |
| `IF`                         | `{% if a > b %} ... {% endif %}`                                              | :x: |
| `IMPORT`                     | `{% import 'forms.html' as forms %}`                                          | :x: |
| `INCLUDE`                    | `{% include 'user.html' %}`                                                   | :x: |
| `MACRO`                      | `{% macro input(name, value, type = "text", size = 20) %} ... {% endmacro %}` | :x: |
| `SANDBOX`                    | `{% sandbox %} {% include 'user.html' %} {% endsandbox %}`                    | :x: |
| `PRINT`                      | `{{ 'foo }} `                                                                 | :heavy_check_mark: (waiting for `{{-` and `-}}`) |
| `SET`                        | `{% set a = 'a' %} {% set a, b, = 'a', 'b' %}`                                | :heavy_check_mark: |
| `SPACELESS`                  | `{% spaceless %}<div>  <span>Hello</span>  </div>{% endspaceless %}`          | :x: |
| `TEXT`                       | `"some text"`                                                                 | :x: |
| `WITH`                       | `{% with { foo: 42 } %} foo: {{ foo }} {% endwith %}`                         | :x: |

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
