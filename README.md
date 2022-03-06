<h1 align="center">
  <br>
    <img src="icon.png" alt="logo" width="200">
</h1>

<h4 align="center">Convert long numbers into abbreviated and  human-readable strings on an easy way.</h4>

| Input :disappointed: | Value :joy: |
| -------------------- | ----------- |
| `6000`               | `'6K'`      |
| `10000`              | `'10km'`    |
| `42500`              | `'42.5 kg'` |
| `1250000`            | `'1.25 MB'` |

## Install

Get it on [npm](https://www.npmjs.com/package/aveta)

```bash
npm install aveta
```

Get it on [yarn](https://yarnpkg.com/package/aveta)

```bash
yarn add  aveta
```

## Usage

```js
aveta(value: number, options: IOptions)
```

```js
import aveta from 'aveta';

// For CommonJS: `const { aveta } = require("aveta");`

aveta(8700); // 8.7K

aveta(123456, {
  digits: 3,
  lowercase: true,
});
// 123k
aveta(4567, {
  digits: 3,
  lowercase: true,
});
// 4.57k
aveta(2048000, {
  precision: 2,
  lowercase: true,
});
// 2.48m

aveta(45500, {
  precision: 3,
  separator: ',',
});
// 4,550K

aveta(1440000, {
  units: ['B', 'KB', 'MB', 'GB', 'TB'],
  space: true,
});
// 1.44 MB
```

### Command Line

```bash
$ aveta 234000
// or
$ npx aveta 234000
234K
```

See `aveta --help` for options.

## Default Options

| Name        | Type            | Default                              | Description                                             |
| ----------- | --------------- | ------------------------------------ | ------------------------------------------------------- |
| `precision` | `number`        | `1`                                  | Number of significant digits                            |
| `digits`    | `number`        | `0`                                  | Number of digits                                        |
| `separator` | `string`        | `'.'`                                | Desired decimal separator (e.g. decimal point or comma) |
| `lowercase` | `boolean`       | `false`                              | Use lowercase abbreviations                             |
| `space`     | `boolean`       | `false`                              | Add a space between number and abbreviation             |
| `units`     | `Array<string>` | `['', 'K', 'M', 'B', 'T', 'P', 'E']` | Unit abbreviations                                      |

---

**Units**

`aveta` allows you custom your own units for your project.

That is amazing `aveta` ! :joy:

---

[MIT License](LICENSE)
