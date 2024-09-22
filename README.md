# Aveta

<h1 align="center">
  <br>
    <img src="icon.png" alt="logo" width="200">
</h1>

<h4 align="center">Convert large numbers into concise, human-readable formats easily.</h4>

| Input :disappointed: | Output :joy: |
| -------------------- | ------------ |
| `6000`               | `'6K'`       |
| `10000`              | `'10K'`      |
| `42500`              | `'42.5K'`    |
| `1250000`            | `'1.25M'`    |

## Installation

### With npm:

```bash
npm install aveta
```

### With Yarn:

```bash
yarn add aveta
```

## Usage

```typescript
aveta(value: number, options?: Partial<IOptions>): string;
```

```js
import aveta from 'aveta';

// For CommonJS: `const { aveta } = require('aveta');`

aveta(8700); // '8.7K'

aveta(123456, {
  digits: 3,
  lowercase: true,
});
// '123k'

aveta(4567, {
  digits: 3,
  lowercase: true,
});
// '4.57k'

aveta(2048000, {
  precision: 2,
  lowercase: true,
});
// '2.48m'

aveta(45500, {
  precision: 3,
  separator: ',',
});
// '45,500K'

aveta(1440000, {
  units: ['B', 'KB', 'MB', 'GB', 'TB'],
  space: true,
});
// '1.44 MB'
```

### AvetaReverse

Aveta also supports reversing the human-readable format back to a numeric value using the `avetaReverse` function.

```typescript
avetaReverse(value: string): number;
```

```js
import { avetaReverse } from 'aveta';

// For CommonJS: `const { avetaReverse } = require('aveta');`

avetaReverse('8.7K'); // 8700

avetaReverse('123k'); // 123000

avetaReverse('4.57k'); // 4570

avetaReverse('2.48m'); // 2480000
```

### Command Line Usage

You can also use `aveta` directly in the terminal.

```bash
$ aveta 234000
# or
$ npx aveta 234000
234K
```

For more options, run:

```bash
aveta --help
```

## Default Options

## Default Options

| Name           | Type                          | Default                              | Description                                                         |
| -------------- | ----------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| `precision`    | `number`                      | `1`                                  | Number of decimal places to round to                                |
| `digits`       | `number`                      | `0`                                  | Number of significant digits to display                             |
| `separator`    | `string`                      | `'.'`                                | Decimal separator (e.g. `.` or `,`)                                 |
| `lowercase`    | `boolean`                     | `false`                              | Output unit abbreviations in lowercase                              |
| `space`        | `boolean`                     | `false`                              | Insert a space between the number and unit abbreviation             |
| `units`        | `Array<string>`               | `['', 'K', 'M', 'B', 'T', 'P', 'E']` | Units to use for thousand, million, billion, etc.                   |
| `base`         | `number`                      | `1000`                               | Base to scale numbers (default is 1000 for K, M, etc.)              |
| `roundingMode` | `'up' \| 'down' \| 'nearest'` | `'nearest'`                          | How numbers are rounded: nearest, always up, or always down(coming) |
| `threshold`    | `number`                      | `0`                                  | Minimum value before unit conversion is applied (coming)            |

---

## License

Aveta is available under the [MIT License](LICENSE).

## Authors

Created by [Mhammed Talhaouy](https://github.com/tal7aouy).
