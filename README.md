# Aveta

<h1 align="center">
  <br>
    <img src="icon.png" alt="logo" width="200">
</h1>

<h4 align="center">Convert large numbers into concise, human-readable formats easily.</h4>

| Input :disappointed: | Output :joy:   |
| -------------------- | -------------- |
| `6000`               | `'6K'`         |
| `10000`              | `'10K'`        |
| `42500`              | `'42.5K'`      |
| `1250000`            | `'1.25M'`      |

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

| Name               | Type                             | Default                                 | Description                                                                 |
| ------------------ | -------------------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| `precision`        | `number`                         | `1`                                     | Number of decimal places to round to                                        |
| `digits`           | `number`                         | `0`                                     | Number of significant digits to display                                     |
| `separator`        | `string`                         | `'.'`                                   | Decimal separator (e.g. `.` or `,`)                                         |
| `lowercase`        | `boolean`                        | `false`                                 | Output unit abbreviations in lowercase                                      |
| `space`            | `boolean`                        | `false`                                 | Insert a space between the number and unit abbreviation                     |
| `units`            | `Array<string>`                  | `['', 'K', 'M', 'B', 'T', 'P', 'E']`    | Units to use for thousand, million, billion, etc.                           |
| `base`             | `number`                         | `1000`                                  | Base to scale numbers (default is 1000 for K, M, etc.)                      |
| `roundingMode`     | `'up' \| 'down' \| 'nearest'`    | `'nearest'`                             | How numbers are rounded: nearest, always up, or always down                 |
| `threshold`        | `number`                         | `0`                                     | Minimum value before unit conversion is applied                             |
| `negativeFormat`   | `'prefix' \| 'parentheses'`      | `'prefix'`                              | How negative numbers are displayed (e.g., with `-` or in parentheses)       |
| `scientificNotation`| `boolean`                       | `false`                                 | Use scientific notation for very large/small numbers                        |
| `localizedUnits`   | `{ [locale: string]: string[] }` | `undefined`                             | Provide localized units for different locales                               |
| `numberFormat`     | `(value: number) => string`      | `undefined`                             | Custom function to format numbers                                           |

---

### New Options

#### **`base`**

Specifies the base used for scaling the number. The default is `1000` (e.g., `K` for thousand), but you can change this to another base like `1024` for file sizes (e.g., `KB`, `MB`).

```js
aveta(1048576, { base: 1024, units: ['B', 'KB', 'MB', 'GB'] });
// '1 MB'
```

#### **`roundingMode`**

Controls how numbers are rounded:

- `'nearest'` (default): rounds to the nearest number.
- `'up'`: always rounds up.
- `'down'`: always rounds down.

```js
aveta(4567, { roundingMode: 'up' });
// '5K'
```

#### **`threshold`**

Sets a threshold value below which numbers will not be formatted with units. For example, if the threshold is `1000`, any number below `1000` will be returned as is.

```js
aveta(999, { threshold: 1000 });
// '999'
```

#### **`negativeFormat`**

Controls how negative numbers are displayed:

- `'prefix'` (default): negative numbers are prefixed with a minus sign (`-`).
- `'parentheses'`: negative numbers are enclosed in parentheses.

```js
aveta(-5000, { negativeFormat: 'parentheses' });
// '(5K)'
```

#### **`scientificNotation`**

If `true`, very large or small numbers will be displayed in scientific notation.

```js
aveta(1e12, { scientificNotation: true });
// '1.00e+12'
```

#### **`localizedUnits`**

Allows the specification of units based on locale. You can pass an object where the keys are locale strings and the values are arrays of unit abbreviations.

```js
aveta(1440000, {
  localizedUnits: {
    en: ['B', 'KB', 'MB', 'GB', 'TB'],
    fr: ['o', 'Ko', 'Mo', 'Go', 'To'],
  },
});
// '1.44 MB' (in English)
// '1,44 Mo' (in French)
```

#### **`numberFormat`**

Provides a custom function to format the number before applying unit abbreviations. This is useful for complex formatting needs.

```js
aveta(12345, {
  numberFormat: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
});
// '$12,345'
```

---

## License

Aveta is available under the [MIT License](LICENSE).

## Authors

Created by [Mhammed Talhaouy](https://github.com/tal7aouy).
