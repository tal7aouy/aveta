# Aveta


Convert large numbers into concise, human-readable formats easily.

## Input 😞 → Output 😂

| Input      | Output   |
|------------|----------|
| 6000       | '6K'     |
| 10000      | '10K'    |
| 42500      | '42.5K'  |
| 1250000    | '1.25M'  |

---

## Installation

### With npm:
```bash
npm install aveta
````

### With Yarn:

```bash
yarn add aveta
```

---

## Usage

```ts
aveta(value: number, options?: Partial<IOptions>): string;
```

```ts
import aveta from 'aveta';

// For CommonJS:
// const { aveta } = require('aveta');

aveta(8700); 
// '8.7K'

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

---

## AvetaReverse

Aveta also supports reversing the human-readable format back to a numeric value.

```ts
avetaReverse(value: string): number;
```

```ts
import { avetaReverse } from 'aveta';

// For CommonJS:
// const { avetaReverse } = require('aveta');

avetaReverse('8.7K');   // 8700
avetaReverse('123k');   // 123000
avetaReverse('4.57k');  // 4570
avetaReverse('2.48m');  // 2480000
```

---

## Command Line Usage

You can also use aveta directly in the terminal:

```bash
$ aveta 234000
# or
$ npx aveta 234000
234K
```

For more options:

```bash
aveta --help
```

---

## Default Options

| Name         | Type                      | Default                      | Description                             |
| ------------ | ------------------------- | ---------------------------- | --------------------------------------- |
| precision    | number                    | 1                            | Number of decimal places to round to    |
| digits       | number                    | 0                            | Number of significant digits to display |
| separator    | string                    | '.'                          | Decimal separator (e.g. . or ,)         |
| lowercase    | boolean                   | false                        | Output unit abbreviations in lowercase  |
| space        | boolean                   | false                        | Insert a space between number and unit  |
| units        | Array<string>             | ['','K','M','B','T','P','E'] | Units for thousand, million, etc.       |
| base         | number                    | 1000                         | Scaling base                            |
| roundingMode | 'up' | 'down' | 'nearest' | 'nearest'                    | Rounding mode                           |
| threshold    | number                    | 0                            | Minimum value before conversion         |

---

## License

Aveta is available under the MIT License.

---

## Authors

Created by **Mhammed Talhaouy**.
